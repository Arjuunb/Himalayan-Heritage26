import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

interface ProductModalProps {
  productId: string;
  onClose: () => void;
}

export default function ProductModal({ productId, onClose }: ProductModalProps) {
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId, 3);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'story'>('description');

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-nepali-dark hover:bg-nepali-red hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative bg-nepali-cream p-8 flex items-center justify-center">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="max-h-80 w-auto object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                
                {/* Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-nepali-red text-white text-xs font-body px-3 py-1 rounded-full">
                    Sale
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Category */}
                <span className="text-nepali-gold text-xs font-body uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Name */}
                <h2 className="font-display text-2xl md:text-3xl text-nepali-dark mt-2 mb-3">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-nepali-gold fill-nepali-gold'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-nepali-dark/60 font-body">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display text-3xl text-nepali-red font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-nepali-dark/40 line-through font-body">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-4 border-b border-nepali-gold/20">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-2 text-sm font-body transition-colors duration-300 ${
                      activeTab === 'description'
                        ? 'text-nepali-red border-b-2 border-nepali-red'
                        : 'text-nepali-dark/60 hover:text-nepali-dark'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('story')}
                    className={`pb-2 text-sm font-body transition-colors duration-300 ${
                      activeTab === 'story'
                        ? 'text-nepali-red border-b-2 border-nepali-red'
                        : 'text-nepali-dark/60 hover:text-nepali-dark'
                    }`}
                  >
                    Cultural Story
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-nepali-dark/70 font-body text-sm leading-relaxed mb-6 min-h-[100px]"
                  >
                    {activeTab === 'description'
                      ? product.description
                      : product.culturalStory || 'No cultural story available for this product.'}
                  </motion.div>
                </AnimatePresence>

                {/* Quantity & Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-3 bg-nepali-cream rounded-xl px-4 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-nepali-dark hover:text-nepali-red transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-body text-nepali-dark w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-nepali-dark hover:text-nepali-green transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>

                  {/* Wishlist */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleWishlist}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      isInWishlist(product.id)
                        ? 'bg-nepali-red text-white'
                        : 'bg-nepali-cream text-nepali-dark hover:bg-nepali-gold'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mt-4">
                  {product.inStock ? (
                    <>
                      <Check className="w-4 h-4 text-nepali-green" />
                      <span className="text-sm text-nepali-green font-body">In Stock</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-nepali-red" />
                      <span className="text-sm text-nepali-red font-body">Out of Stock</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="border-t border-nepali-gold/20 p-8">
                <h3 className="font-display text-lg text-nepali-dark mb-4">
                  You May Also Like
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {relatedProducts.map((related) => (
                    <motion.div
                      key={related.id}
                      whileHover={{ y: -5 }}
                      className="cursor-pointer"
                      onClick={() => {
                        onClose();
                        setTimeout(() => {
                          // Reopen with new product
                        }, 300);
                      }}
                    >
                      <div className="bg-nepali-cream rounded-xl overflow-hidden mb-2">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-24 object-cover"
                        />
                      </div>
                      <h4 className="font-body text-sm text-nepali-dark truncate">
                        {related.name}
                      </h4>
                      <p className="text-nepali-gold text-sm font-body">
                        ${related.price.toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
