export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  seller: Seller;
  description: string;
  image: any;
  images: any[];
  inStock: boolean;
  tags: string[];
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  verified: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  image: any;
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'grid', image: null },
  { id: 'electronics', name: 'Electronics', icon: 'cpu', image: require('../assets/images/banner-electronics.jpg') },
  { id: 'fashion', name: 'Fashion', icon: 'shopping-bag', image: require('../assets/images/banner-fashion.jpg') },
  { id: 'home', name: 'Home', icon: 'home', image: require('../assets/images/banner-home.jpg') },
  { id: 'sports', name: 'Sports', icon: 'activity', image: null },
  { id: 'beauty', name: 'Beauty', icon: 'heart', image: null },
];

const SELLERS: Seller[] = [
  { id: 's1', name: 'TechVault', avatar: 'TV', rating: 4.9, totalSales: 3241, verified: true },
  { id: 's2', name: 'StyleHaus', avatar: 'SH', rating: 4.7, totalSales: 1892, verified: true },
  { id: 's3', name: 'HomeNest', avatar: 'HN', rating: 4.8, totalSales: 2104, verified: false },
  { id: 's4', name: 'FitLife', avatar: 'FL', rating: 4.6, totalSales: 978, verified: true },
  { id: 's5', name: 'GlowCo', avatar: 'GC', rating: 4.9, totalSales: 5621, verified: true },
  { id: 's6', name: 'UrbanDrop', avatar: 'UD', rating: 4.5, totalSales: 432, verified: false },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 342,
    category: 'electronics',
    seller: SELLERS[0],
    description: 'Premium 40-hour battery life with active noise cancellation. Crystal-clear audio with deep bass and crisp highs. Foldable design for easy carry.',
    image: require('../assets/images/banner-electronics.jpg'),
    images: [require('../assets/images/banner-electronics.jpg')],
    inStock: true,
    tags: ['audio', 'wireless', 'noise-cancelling'],
  },
  {
    id: 'p2',
    name: 'Smart Watch Pro',
    price: 249.00,
    originalPrice: 299.00,
    rating: 4.6,
    reviewCount: 189,
    category: 'electronics',
    seller: SELLERS[0],
    description: 'Track your health metrics 24/7. GPS, heart rate, SpO2 monitoring. 7-day battery life. Compatible with iOS and Android.',
    image: require('../assets/images/banner-electronics.jpg'),
    images: [require('../assets/images/banner-electronics.jpg')],
    inStock: true,
    tags: ['smartwatch', 'fitness', 'wearable'],
  },
  {
    id: 'p3',
    name: 'Vintage Denim Jacket',
    price: 78.00,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 94,
    category: 'fashion',
    seller: SELLERS[1],
    description: 'Authentic 90s style oversized denim jacket. Stone-washed finish. Perfect for layering. Unisex fit.',
    image: require('../assets/images/banner-fashion.jpg'),
    images: [require('../assets/images/banner-fashion.jpg')],
    inStock: true,
    tags: ['vintage', 'denim', 'jacket'],
  },
  {
    id: 'p4',
    name: 'Premium Linen Shirt',
    price: 55.00,
    originalPrice: 75.00,
    rating: 4.5,
    reviewCount: 67,
    category: 'fashion',
    seller: SELLERS[1],
    description: '100% natural linen. Breathable and lightweight. Perfect for warm weather. Available in sand, white, and slate.',
    image: require('../assets/images/banner-fashion.jpg'),
    images: [require('../assets/images/banner-fashion.jpg')],
    inStock: true,
    tags: ['linen', 'shirt', 'summer'],
  },
  {
    id: 'p5',
    name: 'Handmade Ceramic Vase',
    price: 42.00,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 211,
    category: 'home',
    seller: SELLERS[2],
    description: 'Hand-thrown stoneware vase with matte glaze finish. Each piece is unique. Measures 25cm tall. Perfect for dried or fresh flowers.',
    image: require('../assets/images/banner-home.jpg'),
    images: [require('../assets/images/banner-home.jpg')],
    inStock: true,
    tags: ['ceramic', 'vase', 'handmade'],
  },
  {
    id: 'p6',
    name: 'Linen Cushion Cover Set',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 158,
    category: 'home',
    seller: SELLERS[2],
    description: 'Set of 2 natural linen cushion covers. 45x45cm. Hidden zipper closure. Machine washable. Pairs beautifully with neutral interiors.',
    image: require('../assets/images/banner-home.jpg'),
    images: [require('../assets/images/banner-home.jpg')],
    inStock: true,
    tags: ['cushion', 'linen', 'home'],
  },
  {
    id: 'p7',
    name: 'Non-Slip Yoga Mat',
    price: 58.00,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 303,
    category: 'sports',
    seller: SELLERS[3],
    description: '6mm thick eco-friendly TPE yoga mat. Superior grip, moisture-resistant. 183x61cm. Includes carrying strap.',
    image: require('../assets/images/banner-home.jpg'),
    images: [require('../assets/images/banner-home.jpg')],
    inStock: true,
    tags: ['yoga', 'fitness', 'mat'],
  },
  {
    id: 'p8',
    name: 'Insulated Water Bottle',
    price: 36.00,
    originalPrice: 45.00,
    rating: 4.8,
    reviewCount: 524,
    category: 'sports',
    seller: SELLERS[3],
    description: 'Double-wall vacuum insulation keeps drinks cold 24h, hot 12h. 750ml. BPA-free stainless steel. Leak-proof lid.',
    image: require('../assets/images/banner-home.jpg'),
    images: [require('../assets/images/banner-home.jpg')],
    inStock: true,
    tags: ['water bottle', 'insulated', 'sports'],
  },
  {
    id: 'p9',
    name: 'Vitamin C Face Serum',
    price: 28.00,
    originalPrice: 38.00,
    rating: 4.9,
    reviewCount: 892,
    category: 'beauty',
    seller: SELLERS[4],
    description: '15% L-ascorbic acid with ferulic acid and vitamin E. Brightens, firms, and protects skin. Suitable for all skin types. 30ml.',
    image: require('../assets/images/banner-fashion.jpg'),
    images: [require('../assets/images/banner-fashion.jpg')],
    inStock: true,
    tags: ['skincare', 'vitamin c', 'serum'],
  },
  {
    id: 'p10',
    name: 'Laptop Stand Aluminum',
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.5,
    reviewCount: 176,
    category: 'electronics',
    seller: SELLERS[0],
    description: 'Adjustable aluminum laptop stand. Ergonomic design with 6 height levels. Compatible with 10-17" laptops. Foldable for portability.',
    image: require('../assets/images/banner-electronics.jpg'),
    images: [require('../assets/images/banner-electronics.jpg')],
    inStock: true,
    tags: ['laptop', 'stand', 'desk'],
  },
  {
    id: 'p11',
    name: 'Canvas Sneakers',
    price: 65.00,
    originalPrice: undefined,
    rating: 4.4,
    reviewCount: 128,
    category: 'fashion',
    seller: SELLERS[5],
    description: 'Classic low-top canvas sneakers. Vulcanized rubber sole. Breathable cotton lining. Available in white, black, and navy.',
    image: require('../assets/images/banner-fashion.jpg'),
    images: [require('../assets/images/banner-fashion.jpg')],
    inStock: true,
    tags: ['sneakers', 'canvas', 'footwear'],
  },
  {
    id: 'p12',
    name: 'Aromatherapy Candle Set',
    price: 32.00,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 267,
    category: 'beauty',
    seller: SELLERS[4],
    description: 'Set of 3 soy wax candles. Scents: cedarwood & vanilla, eucalyptus & mint, rose & amber. 40hr burn time each. Reusable glass jars.',
    image: require('../assets/images/banner-home.jpg'),
    images: [require('../assets/images/banner-home.jpg')],
    inStock: true,
    tags: ['candle', 'aromatherapy', 'gift'],
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((_, i) => [0, 2, 4, 6, 8].includes(i));
export const TRENDING_PRODUCTS = PRODUCTS.filter((_, i) => [1, 3, 5, 7, 9].includes(i));
