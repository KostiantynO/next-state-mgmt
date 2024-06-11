'use client';
import { useRef } from 'react';
import { useStore } from 'react-redux';

import { setReviews } from '@/app/store/reviewsSlice';

import type { ReviewsArray } from '@/api/types';
import type { RootState } from '@/app/store/store';

export const useInitReviewsStore = (initialReviews: ReviewsArray) => {
  const store = useStore<RootState>();
  const initialized = useRef(false);

  if (!initialized.current) {
    store.dispatch(setReviews(initialReviews));
    initialized.current = true;
  }
};
