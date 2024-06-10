'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { setCart } from './cartSlice';
import { createStore } from './store';

import type { StoreType } from './store';
import type { Cart } from '@/api/types';
import type { ReactNode } from 'react';

export const StoreProvider = ({
  initialCart,
  children,
}: {
  initialCart: Cart;
  children: ReactNode;
}) => {
  const storeRef = useRef<StoreType | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
    storeRef.current.dispatch(setCart(initialCart));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
