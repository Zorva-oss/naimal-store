export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Fashion' | 'Bags' | 'Shoes' | 'Electronics' | 'Beauty' | 'Accessories' | 'Home & Living' | 'New Drops';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  videoUrl?: string;
  videoPoster?: string;
  isSoldOut?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isDeal?: boolean;
  dealDiscount?: number;
  dealEndsAt?: string;
  stock: number;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  specifications: Record<string, string>;
  aiMatchScore?: number;
  aiMatchTag?: string;
  aiRationale?: string;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: { name: string; hex: string };
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Advertisement {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  type: 'banner' | 'video_reel' | 'featured';
  mediaUrl: string;
  badge?: string;
  buttonText: string;
  targetProductId?: string;
  likes?: number;
  comments?: number;
  soundTrack?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  tier: string;
  avatar: string;
  membershipId: string;
  rewardPoints: number;
  aestheticPersona: string;
  browsingInterests: { category: string; weight: number }[];
  addresses: {
    id: string;
    name: string;
    street: string;
    city: string;
    isDefault: boolean;
  }[];
}
