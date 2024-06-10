import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import type { RootState } from './store';
import type { Cart } from '@/api/types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: { products: [] },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
});

export const cartSliceReducer = cartSlice.reducer;
export const { setCart } = cartSlice.actions;

const selectCart = (state: RootState) => state.cart.cart;
export const useCart = () => useSelector(selectCart);
