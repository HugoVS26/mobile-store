import { createContext } from 'react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: string;
  storage: string;
  price: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  itemCount: number;
  total: number;
}

export const CartContext = createContext<CartContextValue | null>(null);
