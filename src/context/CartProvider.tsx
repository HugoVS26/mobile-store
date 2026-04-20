import { useState, useEffect, type ReactNode, type JSX } from 'react';
import { CartContext } from './CartContext';
import type { CartItem } from './CartContext';
import { getCartKey } from './cartUtils';

const STORAGE_KEY = 'mbst-cart';

export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect((): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(item: CartItem): void {
    const key = getCartKey(item);
    setItems((prev) => {
      const exists = prev.some((i) => getCartKey(i) === key);
      if (exists) {
        return prev;
      }
      return [...prev, item];
    });
  }

  function removeItem(key: string): void {
    setItems((prev) => prev.filter((i) => getCartKey(i) !== key));
  }

  const itemCount = items.length;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}
