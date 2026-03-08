import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowRight, Eye } from 'lucide-react';
import { products } from '@/data/products';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

interface FeaturedProductsProps {
  onProductClick: (productId: string) => void;
}

export default function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: 'You can view your cart to checkout.',
    });
  };

  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(productId);
    const isAdded = isInWishlist(productId);
    toast.success(isAdded ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  return (
    <section
      id="products"
      ref={containerRef}
      className="py-20 md:py-32 bg-nepali-cream relative"
    >
      <div className="section-padding">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-nepali-gold" />
              <span className="text-nepali-red font-body text-sm tracking-[0.2em] uppercase">
                Shop Now
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-nepali-dark"
            >
              Featured <span className="text-nepali-red">Treasures</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-nepali-dark/60 font-body text-base md:text-lg mt-3 max-w-xl"
            >
              Handpicked authentic Nepali products, each with a story to tell
            </motion.p>
          </div>

          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:inline-flex items-center gap-2 text-nepali-red hover:text-nepali-gold transition-colors duration-300 font-body mt-4 md:mt-0 group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Image Container */}
                <div 
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => onProductClick(product.id)}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredProduct === product.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Overlay */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                      >
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onProductClick(product.id);
                          }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-nepali-dark hover:bg-nepali-gold transition-colors duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ delay: 0.15 }}
                          onClick={(e) => handleToggleWishlist(product.id, e)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                            isInWishlist(product.id)
                              ? 'bg-nepali-red text-white'
                              : 'bg-white text-nepali-dark hover:bg-nepali-gold'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-nepali-red text-white text-xs font-body px-2 py-1 rounded">
                      Sale
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <span className="text-nepali-gold text-xs font-body uppercase tracking-wider">
                    {product.category}
                  </span>

                  {/* Name */}
                  <h3 
                    className="font-display text-lg text-nepali-dark mt-1 mb-2 cursor-pointer hover:text-nepali-red transition-colors duration-300"
                    onClick={() => onProductClick(product.id)}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'text-nepali-gold fill-nepali-gold'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-nepali-dark/60 font-body ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl text-nepali-red font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-nepali-dark/40 line-through font-body">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-10 h-10 bg-nepali-cream rounded-full flex items-center justify-center text-nepali-dark hover:bg-nepali-gold transition-colors duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center md:hidden"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-nepali-red hover:text-nepali-gold transition-colors duration-300 font-body"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
