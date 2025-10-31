export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "headphones" | "speakers" | "earphones";
  price: number;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  description: string;
  features: string;
  includes: Array;
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  relatedProducts: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  _creationTime: number;
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingDetails: {
    address: string;
    zipCode: string;
    city: string;
    country: string;
  };
  items: CartItem[];
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
  paymentMethod: "e-money" | "cash";
  status: "pending" | "confirmed" | "shipped" | "delivered";
}
