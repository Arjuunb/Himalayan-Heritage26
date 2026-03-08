import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Categories from '@/sections/Categories';
import FeaturedProducts from '@/sections/FeaturedProducts';
import Story from '@/sections/Story';
import Testimonials from '@/sections/Testimonials';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductModal from '@/components/ProductModal';
import Chatbot from '@/components/Chatbot';
import SearchModal from '@/components/SearchModal';
import { useStore } from '@/store/useStore';

function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen } = useStore();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-nepali-cream overflow-x-hidden">
      {/* Navigation */}
      <Navbar 
        scrollY={scrollY} 
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts onProductClick={setSelectedProductId} />
        <Story />
        <Testimonials />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProductId && (
          <ProductModal 
            productId={selectedProductId} 
            onClose={() => setSelectedProductId(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
