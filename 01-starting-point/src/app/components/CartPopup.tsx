'use client';
import { useCart } from './CartContext';

import type { Cart } from '@/api/types';

export const CartPopup = ({
  clearCartAction,
}: {
  clearCartAction: () => Promise<Cart>;
}) => {
  const [cart, setCart] = useCart();

  const productsCount = cart.products.length;

  const onClickSetCart = async () => {
    const emptyCart = await clearCartAction();
    setCart(emptyCart);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-1/2 flex-col items-center justify-center rounded-lg bg-white p-4">
        <h2 className="mb-4 text-2xl font-bold leading-10 text-gray-800">
          Your Cart
        </h2>
        {productsCount === 0 && (
          <p className="mb-4 text-lg leading-7 text-gray-600">
            You have 0 items in your cart.
          </p>
        )}
        {productsCount > 0 && (
          <>
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex w-full justify-between text-black"
              >
                <div className="font-bold">{product.name}</div>
                <div className="">
                  {product.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex w-full justify-between">
          <button
            className="mt-6 rounded-lg bg-green-800 px-4 py-2 text-lg font-bold text-white"
            onClick={onClickSetCart}
          >
            Clear Cart
          </button>
          <button className="mt-6 rounded-lg bg-blue-800 px-4 py-2 text-lg font-bold text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
