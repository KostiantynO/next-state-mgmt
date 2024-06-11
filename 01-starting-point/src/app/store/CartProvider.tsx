'use client';

import { createContext, useContext, useState } from 'react';
import { create } from 'zustand';

import type { Cart } from '@/api/types';
import type { ReactNode } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

interface CartStore {
  cart: Cart;
  setCart: (cart: Cart) => void;
}

const createStore = (initialCart: Cart) =>
  create<CartStore>(set => ({
    cart: initialCart,
    setCart(cart) {
      set({ cart });
    },
  }));

type ZustandCartStore = UseBoundStore<StoreApi<CartStore>>;
// type ZustandCartStore = ReturnType<typeof createStore>;

const CartContext = createContext<ZustandCartStore | null>(null);

CartContext.displayName = 'CartContextZustand';

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) throw new Error('useCart must be used within a CartProvider');

  return ctx;
};

export const CartProvider = ({
  initialCart,
  children,
}: {
  initialCart: Cart;
  children: ReactNode;
}) => {
  const [store] = useState(() => createStore(initialCart));

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};

export const selectProductsCount = (state: CartStore) =>
  state.cart.products.length;

export const selectCartSetter = (state: CartStore) => state.setCart;
