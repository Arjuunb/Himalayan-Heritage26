import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Proceeding to checkout...', {
      description: 'This would connect to Stripe in production.',
    });
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-nepali-gold/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-nepali-red" />
            <h2 className="font-display text-xl text-nepali-dark">Your Cart</h2>
            <span className="bg-nepali-gold text-nepali-dark text-xs font-bold px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-nepali-cream flex items-center justify-center text-nepali-dark hover:bg-nepali-red hover:text-white transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-24 bg-nepali-cream rounded-full flex items-center justify-center mb-4"
              >
                <ShoppingBag className="w-12 h-12 text-nepali-dark/30" />
              </motion.div>
              <h3 className="font-display text-lg text-nepali-dark mb-2">Your cart is empty</h3>
              <p className="text-nepali-dark/60 font-body text-sm mb-6">
                Discover our authentic Nepali products
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 bg-nepali-cream/50 rounded-xl p-4"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm text-nepali-dark truncate">
                        {item.name}
                      </h4>
                      <p className="text-nepali-gold font-body text-sm font-semibold mt-1">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-nepali-dark hover:text-nepali-red transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-body text-nepali-dark w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-nepali-dark hover:text-nepali-green transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success(`${item.name} removed from cart`);
                          }}
                          className="text-nepali-dark/40 hover:text-nepali-red transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="font-display text-sm text-nepali-dark font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-nepali-gold/20 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-nepali-dark/60 font-body">Subtotal</span>
              <span className="font-display text-lg text-nepali-dark">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between">
              <span className="text-nepali-dark/60 font-body">Shipping</span>
              <span className="font-body text-nepali-dark">
                {getCartTotal() > 50 ? 'Free' : '$5.00'}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-2 border-t border-nepali-gold/20">
              <span className="font-display text-nepali-dark">Total</span>
              <span className="font-display text-2xl text-nepali-red">
                ${(getCartTotal() + (getCartTotal() > 50 ? 0 : 5)).toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Clear Cart */}
            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="w-full text-nepali-dark/60 hover:text-nepali-red text-sm font-body transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
