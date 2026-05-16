export type Category =
  | "TOP"
  | "BOTTOM"
  | "OUTERWEAR"
  | "FOOTWEAR"
  | "ACCESSORY";

export type Occasion = "JOB_INTERVIEW" | "GYM" | "DINNER_NIGHT";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type BodyShape = "rectangle" | "invertedTriangle" | "hourglass";

export type StyleTag =
  | "Minimalist"
  | "Bold"
  | "Monochrome"
  | "Earth Tones"
  | "Structured"
  | "Relaxed Fit";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: Category;
  occasion: Occasion;
  description: string;
  imageUrl: string;
  detailImageUrl: string;
  tags: string;
  bodyShapes: string;   // comma-separated: "rectangle,hourglass"
  styleTags: string;    // comma-separated: "Minimalist,Structured"
  gender: string;       // "men" | "women" | "unisex"
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  orderId: number;
  product?: Product;
}

export interface Order {
  id: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface QuizState {
  occasion: Occasion | "";
  bodyShape: BodyShape | "";
  preferences: StyleTag[];
}
