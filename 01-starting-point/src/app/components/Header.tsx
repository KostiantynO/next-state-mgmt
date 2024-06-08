'use client';
import Link from 'next/link';
import { useState } from 'react';

import { useCart } from './CartContext';
import { CartPopup } from './CartPopup';

import type { Cart } from '@/api/types';

export const Header = ({
  clearCartAction,
}: {
  clearCartAction: () => Promise<Cart>;
}) => {
  const [showCart, setShowCart] = useState(false);
  const [cart] = useCart();

  const productsCount = cart.products.length;

  const toggleCart = () => setShowCart(prev => !prev);

  const cartPopup = showCart && <CartPopup clearCartAction={clearCartAction} />;

  return (
    <header className="mx-2 mb-10 flex items-center justify-between rounded-b-2xl bg-blue-800 p-4 shadow-lg shadow-white">
      <Link href="/">
        <h1 className="text-3xl font-bold leading-10 text-gray-100">
          Donuts &amp; Dragoons Store
        </h1>
      </Link>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700"
        onClick={toggleCart}
      >
        <span className="text-xl font-bold leading-10 text-gray-100">
          {productsCount}
        </span>
        {cartPopup}
      </button>
    </header>
  );
};
