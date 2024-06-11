'use client';
// import { useDispatch } from 'react-redux';

// import { setCart } from '../store/cartSlice';

import { selectCartSetter, useCart } from '../store/CartProvider';

import type { Cart } from '@/api/types';

export const AddToCart = ({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) => {
  // const dispatch = useDispatch();
  const setCart = useCart()(selectCartSetter);

  const onCLickSetCart = async () => {
    const cartFromServer = await addToCartAction();
    // dispatch(setCart(cartFromServer));
    setCart(cartFromServer);
  };

  return (
    <button
      type="button"
      className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white"
      onClick={onCLickSetCart}
    >
      Add To Cart
    </button>
  );
};
