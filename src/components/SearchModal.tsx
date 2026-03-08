import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 p-4 border-b border-nepali-gold/20">
            <Search className="w-6 h-6 text-nepali-dark/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories..."
              className="flex-1 text-lg text-nepali-dark font-body placeholder:text-nepali-dark/40 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-nepali-cream flex items-center justify-center text-nepali-dark hover:bg-nepali-red hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-6">
                <h3 className="font-display text-sm text-nepali-dark/60 mb-4">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Gundruk', 'Singing Bowl', 'Dhaka Topi', 'Prayer Flags', 'Spices'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-nepali-cream rounded-full text-nepali-dark text-sm font-body hover:bg-nepali-gold hover:text-nepali-dark transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>

                <h3 className="font-display text-sm text-nepali-dark/60 mt-6 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {['Nepali Food', 'Traditional Clothing', 'Handicrafts', 'Cultural Items'].map(
                    (category) => (
                      <button
                        key={category}
                        onClick={() => setQuery(category)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-nepali-cream transition-colors text-left"
                      >
                        <span className="font-body text-nepali-dark">{category}</span>
                        <ArrowRight className="w-4 h-4 text-nepali-dark/40" />
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="p-4">
                <p className="text-sm text-nepali-dark/60 mb-4 font-body">
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                <div className="space-y-3">
                  {results.map((product) => (
                    <motion.a
                      key={product.id}
                      href={`#products`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-nepali-cream transition-colors group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-nepali-cream flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-nepali-dark group-hover:text-nepali-red transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm text-nepali-dark/60 font-body truncate">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-nepali-red font-semibold">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-nepali-dark/0 group-hover:text-nepali-gold transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-nepali-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-nepali-dark/30" />
                </div>
                <h3 className="font-display text-lg text-nepali-dark mb-2">
                  No results found
                </h3>
                <p className="text-nepali-dark/60 font-body text-sm">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
