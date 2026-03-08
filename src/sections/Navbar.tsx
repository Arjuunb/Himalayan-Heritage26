import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface NavbarProps {
  scrollY: number;
  onSearchClick: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Shop', href: '#products' },
  { name: 'Categories', href: '#categories' },
  { name: 'Our Story', href: '#story' },
  { name: 'Contact', href: '#newsletter' },
];

export default function Navbar({ scrollY, onSearchClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, getCartCount, wishlist } = useStore();
  const isScrolled = scrollY > 50;

  const cartCount = getCartCount();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-effect py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nepali-gold to-yellow-600 flex items-center justify-center shadow-gold">
                  <span className="text-nepali-dark font-display font-bold text-lg">H</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-nepali-gold"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-display font-bold text-lg leading-tight transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}>
                  Himalayan
                </h1>
                <p className={`font-display text-xs tracking-widest transition-colors duration-300 ${
                  isScrolled ? 'text-nepali-gold' : 'text-nepali-gold'
                }`}>
                  HERITAGE
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative font-body text-sm font-medium transition-colors duration-300 group ${
                    isScrolled ? 'text-white/90 hover:text-nepali-gold' : 'text-white/90 hover:text-nepali-gold'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nepali-gold transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={onSearchClick}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <motion.a
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className={`hidden sm:flex p-2 rounded-full transition-all duration-300 relative ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-nepali-gold text-nepali-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </motion.a>

              {/* Account */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className={`hidden sm:flex p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </motion.button>

              {/* Cart */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setIsCartOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 relative ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-nepali-gold text-nepali-dark text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden"
          >
            <div className="glass-effect mx-4 rounded-2xl overflow-hidden">
              <nav className="flex flex-col p-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4 text-white/90 hover:text-nepali-gold hover:bg-white/5 rounded-lg transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
