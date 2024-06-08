'use client';
import type {Cart} from '@/api/types';

export default function AddToCart({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) {
  return (
    <button
      className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white"
      onClick={addToCartAction}
    >
      Add To Cart
    </button>
  );
}
