import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { products } from '@/data/products';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: 'Namaste! 🙏 Welcome to Himalayan Heritage! I\'m your cultural guide. How can I help you today?',
    suggestions: [
      'What is Gundruk?',
      'Popular Nepali snacks',
      'Traditional clothing',
      'How to track my order?',
    ],
  },
];

const knowledgeBase: Record<string, string> = {
  'gundruk': 'Gundruk is a traditional fermented leafy green vegetable that is a staple in Nepali cuisine. It is made by fermenting mustard, radish, and cauliflower leaves, then drying them. It has a unique tangy flavor and is rich in probiotics!',
  'sel roti': 'Sel Roti is a traditional Nepali sweet, ring-shaped rice bread/doughnut. It is crispy on the outside and soft on the inside, typically made during festivals like Tihar and Dashain. Our mix makes it easy to prepare at home!',
  'dhaka topi': 'The Dhaka Topi is a traditional Nepali cap made with intricate Dhaka weaving patterns. It is a symbol of Nepali national pride and is worn during special occasions and festivals. Each topi is handcrafted by skilled artisans.',
  'singing bowl': 'Our Tibetan singing bowls are hand-hammered by master craftsmen. They produce rich, resonant tones perfect for meditation and sound healing. Each bowl is unique and blessed according to tradition.',
  'thangka': 'Thangka paintings are traditional Tibetan Buddhist art forms painted on cotton. They depict sacred deities, mandalas, and spiritual scenes. Each painting takes weeks to complete and carries deep spiritual significance.',
  'khukuri': 'The Khukuri is the traditional blade of the Gurkha warriors. Our authentic Khukuris are hand-forged by traditional blacksmiths using techniques passed down through generations. Each comes with a certificate of authenticity.',
  'prayer flags': 'Tibetan prayer flags (Lungta) carry prayers and mantras that spread blessings with the wind. The five colors represent the five elements: blue (sky), white (air), red (fire), green (water), and yellow (earth).',
  'timur': 'Timur is a unique Sichuan pepper native to the Himalayas. It has a citrusy, numbing flavor that is essential to Nepali cuisine. It is one of the key spices in our Nepali Spice Set!',
  'jimbu': 'Jimbu is an aromatic Himalayan herb (Allium hypsistum) used in Nepali cooking, especially in dal and curry. It has a unique flavor that is hard to find outside the Himalayan region.',
  'popular snacks': 'Our most popular Nepali snacks include:\n1. Sel Roti Mix - Traditional rice donut\n2. Gundruk - Fermented greens\n3. Wai Wai Noodles - Instant noodles\n4. Nepali Achar (pickles)\n5. Chiura (beaten rice)',
  'traditional clothing': 'We offer authentic Nepali traditional clothing including:\n- Dhaka Topi (traditional cap)\n- Daura Suruwal (men\'s outfit)\n- Kurta Suruwal (women\'s outfit)\n- Nepali Shawls and Scarves\nAll made with traditional weaving techniques!',
  'order tracking': 'You can track your order by:\n1. Going to "Track Order" in the footer\n2. Entering your order number\n3. Viewing real-time updates on your shipment\nOr simply ask me "Where is my order?" with your order number!',
  'shipping': 'We offer worldwide shipping!\n- Free shipping on orders over $50\n- Standard shipping: 7-14 business days\n- Express shipping: 3-7 business days\nAll orders are carefully packaged to ensure safe delivery.',
  'payment': 'We accept multiple payment methods:\n- Credit/Debit cards (Visa, Mastercard)\n- PayPal\n- Apple Pay\n- Google Pay\nAll transactions are secure and encrypted.',
  'authenticity': 'All our products are 100% authentic and sourced directly from artisans and producers in Nepal. We work with over 500 artisans and ensure fair trade practices. Each product comes with a certificate of authenticity.',
};

function getBotResponse(userMessage: string): { text: string; suggestions?: string[] } {
  const lowerMsg = userMessage.toLowerCase();
  
  // Check for greetings
  if (lowerMsg.match(/^(hi|hello|hey|namaste|greetings)/)) {
    return {
      text: 'Namaste! 🙏 How can I assist you with our Nepali treasures today?',
      suggestions: ['Show me popular products', 'What\'s new?', 'Help with my order'],
    };
  }
  
  // Check for product inquiries
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lowerMsg.includes(key)) {
      return {
        text: response,
        suggestions: ['Add to cart', 'Tell me more', 'Similar products'],
      };
    }
  }
  
  // Check for order tracking
  if (lowerMsg.includes('track') || lowerMsg.includes('order') || lowerMsg.includes('where is')) {
    return {
      text: 'I can help you track your order! Please provide your order number (starts with HH-), and I\'ll check the status for you.',
      suggestions: ['I don\'t have my order number', 'How long does shipping take?'],
    };
  }
  
  // Check for recommendations
  if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest') || lowerMsg.includes('popular') || lowerMsg.includes('best')) {
    const topProducts = products.slice(0, 3);
    return {
      text: `Here are our most popular products:\n\n${topProducts.map((p, i) => `${i + 1}. ${p.name} - $${p.price}`).join('\n')}\n\nWould you like to know more about any of these?`,
      suggestions: topProducts.map(p => p.name),
    };
  }
  
  // Check for categories
  if (lowerMsg.includes('category') || lowerMsg.includes('categories') || lowerMsg.includes('collection')) {
    return {
      text: 'We have four main collections:\n\n1. 🍛 Nepali Food & Spices\n2. 👔 Traditional Clothing\n3. 🎨 Handicrafts & Art\n4. 🙏 Cultural Items\n\nWhich one interests you?',
      suggestions: ['Nepali Food', 'Traditional Clothing', 'Handicrafts', 'Cultural Items'],
    };
  }
  
  // Check for thank you
  if (lowerMsg.match(/(thank|thanks|dhanyabad)/)) {
    return {
      text: 'You\'re very welcome! 😊 It\'s my pleasure to share the beauty of Nepali culture with you. Is there anything else I can help you with?',
      suggestions: ['Show me more products', 'I\'m good, thanks!'],
    };
  }
  
  // Default response
  return {
    text: 'I\'d be happy to help! You can ask me about:\n• Our products (Gundruk, Singing Bowls, Thangka paintings, etc.)\n• Nepali culture and traditions\n• Order tracking and shipping\n• Product recommendations\n\nWhat would you like to know?',
    suggestions: ['Popular products', 'About Nepali culture', 'Shipping info', 'Contact support'],
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response.text,
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    // Auto-send after a brief delay
    setTimeout(() => {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        text: suggestion,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const response = getBotResponse(suggestion);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: response.text,
          suggestions: response.suggestions,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 800);
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-nepali-red rounded-full shadow-lg flex items-center justify-center text-white hover:bg-nepali-gold hover:text-nepali-dark transition-colors duration-300 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-nepali-gold rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-nepali-dark" />
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-nepali-red p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-sm">Heritage Guide</h3>
                  <p className="text-white/60 text-xs font-body">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-nepali-cream/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : ''}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-nepali-red text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white text-nepali-dark rounded-2xl rounded-tl-sm shadow-sm'
                    } p-3`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-nepali-gold" />
                      )}
                      <p className="text-sm font-body whitespace-pre-line">{message.text}</p>
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.type === 'bot' && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-white border border-nepali-gold/30 text-nepali-dark px-3 py-1.5 rounded-full hover:bg-nepali-gold hover:text-nepali-dark transition-colors font-body"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-nepali-gold rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-nepali-gold rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-nepali-gold rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-nepali-gold/20">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Nepali culture..."
                  className="flex-1 px-4 py-2 bg-nepali-cream/50 rounded-full text-nepali-dark text-sm font-body placeholder:text-nepali-dark/40 focus:outline-none focus:ring-2 focus:ring-nepali-gold/30"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-nepali-red rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nepali-gold hover:text-nepali-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
