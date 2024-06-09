'use client';

import { createContext, useContext, useState } from 'react';

import type { Cart } from '@/api/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

type CartState = [Cart, Dispatch<SetStateAction<Cart>>];

const CartContext = createContext<CartState | null>(null);

export const CartProvider = ({
  initialCart,
  children,
}: {
  initialCart: Cart;
  children: ReactNode;
}) => {
  const cartTuple = useCartState(initialCart);

  return (
    <CartContext.Provider value={cartTuple}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartState => {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used within a CartProvider');
  return cart;
};
