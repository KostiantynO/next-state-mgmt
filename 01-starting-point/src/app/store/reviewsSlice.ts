import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import type { RootState } from './store';
import type { ReviewsArray } from '@/api/types';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ReviewsState {
  reviews: ReviewsArray;
}

const initialState: ReviewsState = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, { payload }: PayloadAction<ReviewsArray>) => {
      state.reviews = payload;
    },
  },
});

export const reviewsReducer = reviewsSlice.reducer;
export const { setReviews } = reviewsSlice.actions;

const selectReviews = (state: RootState) => state.reviews.reviews;
export const useReviews = () => useSelector(selectReviews);
