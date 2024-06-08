'use client';
import { useCart } from './CartContext';

import type { Cart } from '@/api/types';

export const AddToCart = ({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) => {
  const [, setCart] = useCart();

  const onCLickSetCart = async () => {
    const updatedCart = await addToCartAction();
    setCart(updatedCart);
  };

  return (
    <button
      className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white"
      onClick={onCLickSetCart}
    >
      Add To Cart
    </button>
  );
};
