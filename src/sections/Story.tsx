import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Quote, Users, Package, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Artisans Supported' },
  { icon: Package, value: '50K+', label: 'Happy Customers' },
  { icon: Award, value: '100%', label: 'Authentic Products' },
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="story"
      ref={containerRef}
      className="py-20 md:py-32 bg-nepali-cream relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 mandala-pattern opacity-30" />

      <div className="section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div style={{ y: imageY }} className="relative">
                <img
                  src="/story-image.jpg"
                  alt="Nepali artisan at work"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </motion.div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-nepali-dark/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-6 -right-6 bg-nepali-red text-white p-6 rounded-2xl shadow-xl"
            >
              <div className="font-display text-3xl font-bold">10+</div>
              <div className="text-white/80 text-sm font-body">Years of Excellence</div>
            </motion.div>

            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-nepali-gold rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-nepali-gold rounded-br-2xl" />
          </motion.div>

          {/* Content Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-nepali-gold" />
              <span className="text-nepali-red font-body text-sm tracking-[0.2em] uppercase">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-nepali-dark mb-6"
            >
              Bringing the <span className="text-nepali-red">Himalayas</span> to You
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-nepali-dark/70 font-body text-base md:text-lg leading-relaxed mb-6"
            >
              Founded in 2014, Himalayan Heritage began with a simple mission: to share the 
              authentic beauty of Nepali culture with the world. We work directly with artisans, 
              farmers, and craftspeople across Nepal, ensuring fair trade practices and preserving 
              traditional techniques passed down through generations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-nepali-dark/70 font-body text-base md:text-lg leading-relaxed mb-8"
            >
              Every product in our collection tells a story of heritage, craftsmanship, and the 
              enduring spirit of the Himalayan people. From the sacred valleys of Kathmandu to 
              the towering peaks of Everest, we bring you treasures that embody the soul of Nepal.
            </motion.p>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 border-l-4 border-nepali-gold"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-nepali-gold/30" />
              <p className="font-accent text-lg md:text-xl text-nepali-dark italic leading-relaxed">
                "Every product tells a story of heritage, craftsmanship, and the spirit of the Himalayas."
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-nepali-gold mx-auto mb-2" />
                  <div className="font-display text-xl md:text-2xl text-nepali-red font-bold">
                    {stat.value}
                  </div>
                  <div className="text-nepali-dark/60 text-xs md:text-sm font-body">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
