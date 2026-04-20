import { renderHook, act } from '@testing-library/react';
import type { ReactNode, JSX } from 'react';
import { CartProvider } from './CartProvider';
import type { CartItem } from './CartContext';
import { getCartKey } from './cartUtils';
import { useCart } from '@/hooks/useCart';
const STORAGE_KEY = 'mbst-cart';

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <CartProvider>{children}</CartProvider>;
}

const mobileA: CartItem = {
  id: 'SMG-S24U',
  name: 'Galaxy S24 Ultra',
  brand: 'Samsung',
  imageUrl:
    'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
  color: 'Titanium Violet',
  storage: '256 GB',
  price: 1229,
};

const mobileB: CartItem = {
  ...mobileA,
  color: 'Titanium Black',
};

describe('Given a CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('When the cart is empty', () => {
    it('Should have zero items and total', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
      expect(result.current.itemCount).toBe(0);
      expect(result.current.total).toBe(0);
    });
  });

  describe('When adding an item', () => {
    it('Should add it to the cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mobileA);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(mobileA);
      expect(result.current.itemCount).toBe(1);
      expect(result.current.total).toBe(1229);
    });

    it('Should not add a duplicate (same id + color + storage)', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mobileA);
        result.current.addItem(mobileA);
      });

      expect(result.current.items).toHaveLength(1);
    });

    it('Should allow the same phone with a different color as a separate entry', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mobileA);
        result.current.addItem(mobileB);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.total).toBe(mobileA.price + mobileB.price);
    });
  });

  describe('When removing an item', () => {
    it('Should remove it by key', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mobileA);
        result.current.addItem(mobileB);
      });

      act(() => {
        result.current.removeItem(getCartKey(mobileA));
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(mobileB);
    });
  });

  describe('When the page loads with existing localStorage data', () => {
    it('Should rehydrate the cart from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mobileA]));

      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual(mobileA);
    });
  });

  describe('When cart state changes', () => {
    it('Should persist to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mobileA);
      });

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as CartItem[];
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(mobileA);
    });
  });

  describe('When useCart is used outside CartProvider', () => {
    it('Should throw an error', () => {
      expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider');
    });
  });
});
