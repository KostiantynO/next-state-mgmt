'use client';
import type { Cart } from '@/api/types';

export const AddToCart = ({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) => (
  <button
    className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white"
    onClick={addToCartAction}
  >
    Add To Cart
  </button>
);
