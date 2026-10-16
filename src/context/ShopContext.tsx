import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ProductColor, OrderStatus, ShippingAddress, DeliveryZone, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { DELIVERY_FEES } from '../data/bangladeshData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  activePage: string;
  setActivePage: (page: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  crmOpen: boolean;
  setCrmOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string | 'All';
  setSelectedCategoryFilter: (category: string | 'All') => void;
  
  // Cart Actions
  addToCart: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Navigation & Product Flow
  viewProductDetails: (product: Product) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Order & Checkout
  orders: Order[];
  latestOrder: Order | null;
  placeOrder: (shipping: ShippingAddress, deliveryZone: DeliveryZone, paymentMethod: PaymentMethod, trxId?: string) => Order;
  trackOrderNumber: string;
  setTrackOrderNumber: (code: string) => void;
  formatBDT: (amount: number) => string;

  // CRM Management Actions
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (newProd: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, courier?: string, trackingCode?: string) => void;
  resetProductsToDefault: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SAMPLE_INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'AA-8921',
    createdAt: '2026-10-15T14:32:00Z',
    customer: {
      fullName: 'Nusrat Jahan',
      phone: '01711234567',
      email: 'nusrat.jahan@gmail.com',
      division: 'Dhaka',
      district: 'Dhaka',
      thana: 'Gulshan',
      fullAddress: 'House 42, Road 11, Block D, Gulshan-1, Dhaka',
      deliveryNotes: 'Please ring the bell on 3rd floor.'
    },
    items: [
      {
        id: 'ci-01',
        productId: 'tp-01',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: '40',
        quantity: 1,
        price: 4950
      }
    ],
    subtotal: 4950,
    deliveryFee: 0,
    discount: 495,
    total: 4455,
    deliveryZone: 'dhaka',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'shipped',
    courier: 'Steadfast',
    trackingCode: 'SF-DK-904231'
  },
  {
    id: 'ord-102',
    orderNumber: 'AA-8922',
    createdAt: '2026-10-16T09:15:00Z',
    customer: {
      fullName: 'Tasmia Rahman',
      phone: '01819876543',
      email: 'tasmia.ctg@yahoo.com',
      division: 'Chittagong',
      district: 'Chittagong',
      thana: 'Nasirabad',
      fullAddress: 'Flat 4B, Rose Valley, Nasirabad Housing Society, Chittagong',
      deliveryNotes: 'Call before arriving.'
    },
    items: [
      {
        id: 'ci-02',
        productId: 'wd-01',
        product: INITIAL_PRODUCTS[10],
        selectedColor: INITIAL_PRODUCTS[10].colors[0],
        selectedSize: 'M',
        quantity: 1,
        price: 3450
      },
      {
        id: 'ci-03',
        productId: 'hj-01',
        product: INITIAL_PRODUCTS[18],
        selectedColor: INITIAL_PRODUCTS[18].colors[0],
        selectedSize: 'Regular (75 x 185 cm)',
        quantity: 1,
        price: 1250
      }
    ],
    subtotal: 4700,
    deliveryFee: 130,
    discount: 0,
    total: 4830,
    deliveryZone: 'outside-dhaka',
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    trxId: '9BK208492019',
    orderStatus: 'confirmed',
    courier: 'Pathao',
    trackingCode: 'PTH-CTG-449102'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy storage without color image URLs
      localStorage.removeItem('authentix_products_v1');
      const saved = localStorage.getItem('authentix_products_v2');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const hasColorImages = parsed?.[0]?.colors?.every((c) => !!c.imageUrl);
        if (Array.isArray(parsed) && parsed.length >= 30 && hasColorImages) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Load Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('authentix_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('authentix_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['tp-01', 'wd-01'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('authentix_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_INITIAL_ORDERS;
  });

  // UI state
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [crmOpen, setCrmOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | 'All'>('All');
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [trackOrderNumber, setTrackOrderNumber] = useState<string>('');

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('authentix_products_v2', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('authentix_cart_v1', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('authentix_wishlist_v1', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('authentix_orders_v1', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Format BDT
  const formatBDT = (amount: number): string => {
    return `৳${amount.toLocaleString('en-US')}`;
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Apply Coupon
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AUTHENTIX10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon('AUTHENTIX10');
      setCouponDiscount(disc);
      return { success: true, message: 'Coupon applied! 10% discount has been applied.' };
    }
    if (clean === 'EID500') {
      if (cartSubtotal < 3000) {
        return { success: false, message: 'Minimum order amount for EID500 is ৳3,000' };
      }
      setAppliedCoupon('EID500');
      setCouponDiscount(500);
      return { success: true, message: 'Coupon applied! ৳500 flat discount applied.' };
    }
    if (clean === 'WELCOME10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setAppliedCoupon('WELCOME10');
      setCouponDiscount(disc);
      return { success: true, message: 'Welcome voucher! 10% discount applied.' };
    }
    return { success: false, message: 'Invalid promo code. Try AUTHENTIX10 or WELCOME10' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Recalculate coupon discount if subtotal changes
  useEffect(() => {
    if (appliedCoupon === 'AUTHENTIX10' || appliedCoupon === 'WELCOME10') {
      setCouponDiscount(Math.round(cartSubtotal * 0.1));
    } else if (appliedCoupon === 'EID500') {
      if (cartSubtotal < 3000) {
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }
    }
  }, [cartSubtotal, appliedCoupon]);

  // Add to cart
  const addToCart = (product: Product, color: ProductColor, size: string, quantity = 1) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.selectedColor.name === color.name && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
        price: product.price
      };
      setCart((prev) => [...prev, newItem]);
    }

    setCartDrawerOpen(true);
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Navigation
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Place Order (Specifically built for Bangladesh Cash on Delivery & bKash)
  const placeOrder = (
    shipping: ShippingAddress,
    deliveryZone: DeliveryZone,
    paymentMethod: PaymentMethod,
    trxId?: string
  ): Order => {
    const deliveryFee =
      cartSubtotal >= DELIVERY_FEES.freeThreshold
        ? 0
        : deliveryZone === 'dhaka'
        ? DELIVERY_FEES.dhaka
        : DELIVERY_FEES.outsideDhaka;

    const finalTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);
    const orderNum = `AA-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer: shipping,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount: couponDiscount,
      total: finalTotal,
      deliveryZone,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      trxId: trxId || undefined,
      orderStatus: 'pending',
      courier: deliveryZone === 'dhaka' ? 'Pathao' : 'Steadfast',
      trackingCode: `${deliveryZone === 'dhaka' ? 'PTH' : 'STF'}-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setActivePage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newOrder;
  };

  // CRM: Update product
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  // CRM: Add product
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // CRM: Delete product
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // CRM: Update order status
  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    courier?: string,
    trackingCode?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: status,
            paymentStatus: status === 'delivered' ? 'paid' : ord.paymentStatus,
            courier: (courier as any) || ord.courier,
            trackingCode: trackingCode || ord.trackingCode
          };
        }
        return ord;
      })
    );
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('authentix_products_v1');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        cartDrawerOpen,
        setCartDrawerOpen,
        crmOpen,
        setCrmOpen,
        searchModalOpen,
        setSearchModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        viewProductDetails,
        openQuickView,
        closeQuickView,
        orders,
        latestOrder,
        placeOrder,
        trackOrderNumber,
        setTrackOrderNumber,
        formatBDT,
        updateProduct,
        addProduct,
        deleteProduct,
        updateOrderStatus,
        resetProductsToDefault
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
