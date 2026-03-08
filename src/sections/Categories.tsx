import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export default function Categories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="categories"
      ref={containerRef}
      className="py-20 md:py-32 bg-nepali-cream relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 mandala-pattern opacity-50" />

      {/* Rotating Mandala */}
      <motion.div
        className="absolute -right-64 -top-64 w-[800px] h-[800px] opacity-5 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              stroke="#D4AF37"
              strokeWidth="0.5"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
      </motion.div>

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-nepali-gold" />
            <span className="text-nepali-red font-body text-sm tracking-[0.2em] uppercase">
              Browse By
            </span>
            <div className="w-8 h-px bg-nepali-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-nepali-dark mb-4"
          >
            Explore Our <span className="text-nepali-red">Collections</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-nepali-dark/60 font-body text-base md:text-lg max-w-2xl mx-auto"
          >
            Journey through the rich traditions of Nepal and discover authentic treasures
          </motion.p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.a
                href={`#products`}
                className="group relative block h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0.8 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="font-display text-xl md:text-2xl text-white mb-2 group-hover:text-nepali-gold transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/70 font-body text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-nepali-gold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <span className="text-sm font-body">Explore</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </motion.div>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-nepali-gold/50 transition-colors duration-500" />

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-nepali-gold/0 group-hover:border-nepali-gold/70 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-nepali-gold/0 group-hover:border-nepali-gold/70 transition-colors duration-500" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
