import { configureStore } from '@reduxjs/toolkit';

import { cartSliceReducer } from './cartSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartSliceReducer,
    },
  });

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
