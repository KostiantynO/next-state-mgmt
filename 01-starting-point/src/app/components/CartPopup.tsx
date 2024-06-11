'use client';
// import { useDispatch } from 'react-redux';
// import { setCart, useCart } from '../store/cartSlice';

import { useCart } from '../store/CartProvider';

import type { Cart } from '@/api/types';

export const CartPopup = ({
  clearCartAction,
}: {
  clearCartAction: () => Promise<Cart>;
}) => {
  const { cart, setCart } = useCart()();

  // const dispatch = useDispatch();

  const productsCount = cart.products.length;

  const onClickClearCart = async () => {
    const emptyCartFromServer = await clearCartAction();
    setCart(emptyCartFromServer);
    // dispatch(setCart(emptyCartFromServer));
  };

  const inCartProductsList = productsCount > 0 && (
    <>
      {cart.products.map(({ name, price }, index) => {
        const priceJSX = price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return (
          <div key={index} className="flex w-full justify-between text-black">
            <div className="font-bold">{name}</div>
            <div className="">{priceJSX}</div>
          </div>
        );
      })}
    </>
  );

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

        {inCartProductsList}

        <div className="flex w-full justify-between">
          <button
            type="button"
            className="mt-6 rounded-lg bg-green-800 px-4 py-2 text-lg font-bold text-white"
            onClick={onClickClearCart}
          >
            Clear Cart
          </button>

          <button
            type="button"
            className="mt-6 rounded-lg bg-blue-800 px-4 py-2 text-lg font-bold text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
