export type ProductCategory = 
  | 'Three-Piece'
  | 'Western Dress'
  | 'Hijab'
  | 'Kurti & Tunics'
  | 'Saree & Festive';

export interface ProductColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  slug: string;
  category: ProductCategory;
  price: number; // in BDT
  originalPrice?: number; // in BDT
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  fabric: string;
  workDetails: string;
  dupattaDetails?: string;
  bottomDetails?: string;
  careInstructions: string;
  sku: string;
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  price: number;
}

export type DeliveryZone = 'dhaka' | 'outside-dhaka';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  district: string;
  fullAddress: string;
  alternatePhone?: string;
  email?: string;
  division?: string;
  thana?: string;
  deliveryNotes?: string;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryZone: DeliveryZone;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid';
  trxId?: string;
  orderStatus: OrderStatus;
  courier?: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly';
  trackingCode?: string;
}

export interface CustomerReview {
  id: string;
  userName: string;
  location: string; // e.g., 'Dhanmondi, Dhaka'
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verifiedPurchase: boolean;
}
