export interface Product {
  id: string;
  name: string;
  category: 'bra' | 'panty' | 'nighty' | 'intimate';
  price: number;
  image: string;
  images?: string[];
  description: string;
  hindiDescription: string;
  comfortLevel: number; // 1-5
  fabric: string;
  sizes: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  imageUrl?: string;
  timestamp: Date;
  isUser: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  photoUrl: string | null;
  age: string;
  size: string;
  religion: string;
}

export interface CartItem {
  id: string; // Unique ID for cart item (product ID + size + color)
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export type ViewState = 'home' | 'shop' | 'community' | 'ai-help' | 'product-detail' | 'discreet' | 'profile' | 'cart' | 'checkout' | 'order-success';

export type Language = 'hi' | 'en';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
  likes: number;
}

export interface UserSettings {
  language: Language;
  discreetMode: boolean;
}