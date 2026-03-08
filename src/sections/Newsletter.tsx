import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Check, Mountain } from 'lucide-react';
import { toast } from 'sonner';

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success('Successfully subscribed!', {
      description: 'You will receive our latest updates and offers.',
    });
  };

  return (
    <section
      id="newsletter"
      ref={containerRef}
      className="py-20 md:py-32 bg-nepali-cream relative overflow-hidden"
    >
      {/* Mountain Silhouette Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="#1A1A1A"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="section-padding relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Content */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-nepali-red to-red-900 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Mountain className="w-10 h-10 text-nepali-gold mb-6" />
                  <h3 className="font-display text-2xl md:text-3xl mb-4">
                    Join Our Journey
                  </h3>
                  <p className="text-white/80 font-body leading-relaxed">
                    Subscribe to receive exclusive offers, cultural stories, and be the first 
                    to know about new arrivals from Nepal.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-nepali-red bg-nepali-cream overflow-hidden"
                      >
                        <img
                          src={`/customer-${i}.jpg`}
                          alt="Customer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-white/70 font-body">
                    Join 10,000+ subscribers
                  </p>
                </motion.div>
              </div>

              {/* Right Form */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-nepali-dark font-body text-sm mb-2"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 pr-12 bg-nepali-cream/50 border border-nepali-gold/30 rounded-xl text-nepali-dark font-body placeholder:text-nepali-dark/40 focus:outline-none focus:border-nepali-gold focus:ring-2 focus:ring-nepali-gold/20 transition-all duration-300"
                          />
                          <Send className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nepali-dark/40" />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-nepali-dark border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Subscribe
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-nepali-dark/50 font-body text-center">
                        We respect your privacy. Unsubscribe anytime.
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 bg-nepali-gold rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-nepali-dark" />
                      </motion.div>
                      <h4 className="font-display text-xl text-nepali-dark mb-2">
                        Welcome to the Family!
                      </h4>
                      <p className="text-nepali-dark/60 font-body">
                        Check your inbox for a special welcome gift.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
