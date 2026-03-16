// Inkwear — Custom Hand-Painted Shoe Studio
// All shoes are displayed as plain white canvas, ready for customization.

export const CUSTOMIZATION_FEE = 3000;

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: 'sneakers' | 'sports' | 'casual' | 'formal';
  image: string;
  images: string[];
  sizes: number[];
  description: string;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Canvas Low-Top',
    brand: 'Inkwear',
    price: 4999,
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Classic low-top white canvas sneaker — the perfect blank canvas for your custom artwork. Durable cotton upper with vulcanized rubber sole.',
    featured: true,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Sport Runner White',
    brand: 'Inkwear',
    price: 5999,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Performance running shoe in clean white. Breathable mesh upper ready to be transformed with your custom hand-painted design.',
    featured: true,
    rating: 4.6,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Leather Derby Blank',
    brand: 'Inkwear',
    price: 7999,
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    ],
    sizes: [7, 8, 9, 10],
    description: 'Premium white leather derby shoe. Smooth surface ideal for detailed hand-painted artwork that makes a statement at formal events.',
    featured: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Everyday Slip-On',
    brand: 'Inkwear',
    price: 3999,
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Lightweight white slip-on shoe — effortless to wear, effortless to customize. Your everyday wearable art.',
    featured: false,
    rating: 4.5,
    reviews: 312,
  },
  {
    id: '5',
    name: 'High-Top Canvas',
    brand: 'Inkwear',
    price: 5499,
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'High-top white canvas sneaker with extra surface area for bold, wraparound custom designs. Ankle support meets art.',
    featured: true,
    rating: 4.7,
    reviews: 278,
  },
  {
    id: '6',
    name: 'Retro Court White',
    brand: 'Inkwear',
    price: 4499,
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Retro court-style white sneaker. Iconic silhouette waiting for your unique artistic touch.',
    featured: false,
    rating: 4.4,
    reviews: 201,
  },
  {
    id: '7',
    name: 'Oxford White Leather',
    brand: 'Inkwear',
    price: 8999,
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    ],
    sizes: [7, 8, 9, 10],
    description: 'Handcrafted white leather oxford — the ultimate formal canvas. Premium surface for sophisticated custom artwork.',
    featured: false,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '8',
    name: 'Cloud Walker Blank',
    brand: 'Inkwear',
    price: 3499,
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Ultra-soft cushioned white shoe. Walk on clouds while wearing your one-of-a-kind hand-painted design.',
    featured: false,
    rating: 4.6,
    reviews: 445,
  },
];

export const categories = [
  { id: 'sneakers', name: 'Sneakers', icon: '👟' },
  { id: 'sports', name: 'Sports', icon: '🏃' },
  { id: 'casual', name: 'Casual', icon: '🚶' },
  { id: 'formal', name: 'Formal', icon: '👞' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};
