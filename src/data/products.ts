// Dummy shoe data for UrbanKicks
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
    name: 'Air Max Velocity',
    brand: 'UrbanKicks',
    price: 12999,
    originalPrice: 15999,
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Experience unmatched comfort with our Air Max Velocity. Featuring responsive cushioning and a sleek design that turns heads.',
    featured: true,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Street Runner Pro',
    brand: 'UrbanKicks',
    price: 9999,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Built for performance. The Street Runner Pro delivers exceptional grip and support for your daily runs.',
    featured: true,
    rating: 4.6,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Classic Leather Elite',
    brand: 'UrbanKicks',
    price: 14999,
    originalPrice: 17999,
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
    ],
    sizes: [7, 8, 9, 10],
    description: 'Timeless elegance meets modern comfort. Premium leather construction for the distinguished gentleman.',
    featured: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Urban Casual X',
    brand: 'UrbanKicks',
    price: 7999,
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Your everyday essential. Lightweight, breathable, and effortlessly stylish.',
    featured: false,
    rating: 4.5,
    reviews: 312,
  },
  {
    id: '5',
    name: 'Flex Motion 3.0',
    brand: 'UrbanKicks',
    price: 11999,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Engineered for athletes. Maximum flexibility with zero compromise on support.',
    featured: true,
    rating: 4.7,
    reviews: 278,
  },
  {
    id: '6',
    name: 'Retro Wave',
    brand: 'UrbanKicks',
    price: 8499,
    category: 'sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Vintage vibes with modern tech. Stand out from the crowd with these iconic silhouettes.',
    featured: false,
    rating: 4.4,
    reviews: 201,
  },
  {
    id: '7',
    name: 'Oxford Premium',
    brand: 'UrbanKicks',
    price: 16999,
    category: 'formal',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80',
    ],
    sizes: [7, 8, 9, 10],
    description: 'Handcrafted excellence. Make a statement at every formal occasion.',
    featured: false,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '8',
    name: 'Cloud Walker',
    brand: 'UrbanKicks',
    price: 6999,
    category: 'casual',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
    ],
    sizes: [6, 7, 8, 9, 10],
    description: 'Walk on clouds. Ultra-soft cushioning for all-day comfort.',
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
