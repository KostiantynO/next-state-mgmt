import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from './cartSlice';
import { reviewsReducer } from './reviewsSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      reviews: reviewsReducer,
    },
  });

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
