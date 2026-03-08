import type { Product } from '@/store/useStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Gundruk',
    price: 12.99,
    image: '/product-gundruk.jpg',
    category: 'food',
    description: 'Traditional fermented leafy greens, a staple in Nepali cuisine. Made from mustard, radish, and cauliflower leaves that are fermented and dried.',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    culturalStory: 'Gundruk has been a part of Nepali cuisine for centuries. It was developed as a way to preserve vegetables for the long winter months when fresh produce was scarce. The fermentation process not only preserves the vegetables but also enhances their nutritional value.',
  },
  {
    id: '2',
    name: 'Dhaka Topi',
    price: 24.99,
    image: '/product-dhaka-topi.jpg',
    category: 'clothing',
    description: 'Authentic Nepali cap woven with traditional Dhaka patterns. Handcrafted by skilled artisans using centuries-old weaving techniques.',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    culturalStory: 'The Dhaka Topi is a symbol of Nepali national identity. Worn by men on special occasions and festivals, it represents the rich textile heritage of the Eastern Himalayan region.',
  },
  {
    id: '3',
    name: 'Singing Bowl',
    price: 89.99,
    originalPrice: 109.99,
    image: '/product-singing-bowl.jpg',
    category: 'handicrafts',
    description: 'Hand-hammered Tibetan meditation bowl with rich, resonant tones. Perfect for meditation, sound healing, and spiritual practices.',
    rating: 5.0,
    reviews: 156,
    inStock: true,
    culturalStory: 'Singing bowls have been used in Himalayan meditation practices for over 2,000 years. Each bowl is carefully handcrafted by traditional artisans, with the hammering process creating unique harmonic frequencies.',
  },
  {
    id: '4',
    name: 'Sel Roti Mix',
    price: 8.99,
    image: '/product-sel-roti.jpg',
    category: 'food',
    description: 'Traditional rice donut mix for making authentic Sel Roti at home. Just add water and fry for a delicious Nepali treat.',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    culturalStory: 'Sel Roti is a traditional Nepali sweet bread made during festivals like Tihar and Dashain. Its distinctive ring shape symbolizes the circle of life and prosperity.',
  },
  {
    id: '5',
    name: 'Thangka Painting',
    price: 149.99,
    image: '/product-thangka.jpg',
    category: 'handicrafts',
    description: 'Hand-painted Tibetan Buddhist art on cotton, depicting sacred deities and mandalas. Each piece is a unique spiritual artwork.',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    culturalStory: 'Thangka paintings are religious art forms that have been practiced in the Himalayas for over a thousand years. They serve as teaching tools and aids to meditation, with every element carrying deep spiritual significance.',
  },
  {
    id: '6',
    name: 'Khukuri Knife',
    price: 199.99,
    image: '/product-khukuri.jpg',
    category: 'cultural',
    description: 'Authentic Gurkha ceremonial blade with traditional sheath. Hand-forged by master craftsmen in the traditional style.',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    culturalStory: 'The Khukuri is the traditional knife of the Gurkha warriors of Nepal. It has been their weapon of choice for centuries and symbolizes bravery and honor. Each Khukuri is blessed in a traditional ceremony before leaving the forge.',
  },
  {
    id: '7',
    name: 'Nepali Spice Set',
    price: 34.99,
    image: '/product-spice-set.jpg',
    category: 'food',
    description: 'Essential Himalayan spices including turmeric, timur, jimbu, and cardamom. Perfect for authentic Nepali cooking.',
    rating: 4.9,
    reviews: 178,
    inStock: true,
    culturalStory: 'Nepali cuisine is defined by its unique spice blends. Timur (Sichuan pepper) and Jimbu (Himalayan herb) are indigenous to the region and give Nepali food its distinctive flavor profile.',
  },
  {
    id: '8',
    name: 'Prayer Flags',
    price: 15.99,
    image: '/product-prayer-flags.jpg',
    category: 'cultural',
    description: 'Traditional Tibetan Buddhist prayer flags (Lungta) in five colors. Each flag carries prayers and mantras that spread goodwill with the wind.',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    culturalStory: 'Prayer flags, known as Lungta (wind horses), are believed to spread blessings and positive energy with every breeze. The five colors represent the five elements: blue (sky), white (air), red (fire), green (water), and yellow (earth).',
  },
];

export const categories = [
  {
    id: 'food',
    name: 'Nepali Food & Spices',
    description: 'Authentic flavors from the Himalayas',
    image: '/category-food.jpg',
  },
  {
    id: 'clothing',
    name: 'Traditional Clothing',
    description: 'Wear the heritage',
    image: '/category-clothing.jpg',
  },
  {
    id: 'handicrafts',
    name: 'Handicrafts & Art',
    description: 'Masterpieces by skilled artisans',
    image: '/category-handicrafts.jpg',
  },
  {
    id: 'cultural',
    name: 'Cultural Items',
    description: 'Sacred objects of devotion',
    image: '/category-cultural.jpg',
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'USA',
    image: '/customer-1.jpg',
    rating: 5,
    text: 'The singing bowl I ordered exceeded my expectations. The sound is absolutely mesmerizing and the craftsmanship is impeccable.',
  },
  {
    id: '2',
    name: 'Raj K.',
    location: 'UK',
    image: '/customer-2.jpg',
    rating: 5,
    text: 'Finally found authentic Nepali spices! The timur and jimbu remind me of my grandmother\'s cooking.',
  },
  {
    id: '3',
    name: 'Emma L.',
    location: 'Australia',
    image: '/customer-3.jpg',
    rating: 5,
    text: 'Beautiful dhaka topi and fast shipping. My son wore it for his cultural presentation at school.',
  },
  {
    id: '4',
    name: 'Michael T.',
    location: 'Canada',
    image: '/customer-4.jpg',
    rating: 5,
    text: 'The thangka painting is stunning. You can feel the spiritual energy in every brushstroke.',
  },
  {
    id: '5',
    name: 'Priya S.',
    location: 'India',
    image: '/customer-5.jpg',
    rating: 5,
    text: 'Excellent quality and authentic products. The customer service was exceptional.',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};
