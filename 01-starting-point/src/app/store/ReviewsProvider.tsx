'use client';
import { createContext, useContext, useState } from 'react';
import { create } from 'zustand';

import type { ReviewsArray } from '@/api/types';
import type { ReactNode } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

interface ReviewsStore {
  reviews: ReviewsArray;
  setReviews: (reviews: ReviewsArray) => void;
}

const createReviewsStore = (initialReviews: ReviewsArray) =>
  create<ReviewsStore>(set => ({
    reviews: initialReviews,
    setReviews(reviews) {
      set({ reviews });
    },
  }));

type ZustandReviewsStore = UseBoundStore<StoreApi<ReviewsStore>>;
// type ZustandReviewsStore = ReturnType<typeof createReviewsStore>;

const ReviewsContext = createContext<ZustandReviewsStore | null>(null);

ReviewsContext.displayName = 'ReviewsContextZustand';

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);

  if (!ctx) throw new Error('useReviews must be used within a ReviewsProvider');

  return ctx;
};

export const ReviewsProvider = ({
  initialReviews,
  children,
}: {
  initialReviews: ReviewsArray;
  children: ReactNode;
}) => {
  const [store] = useState(() => createReviewsStore(initialReviews));

  return (
    <ReviewsContext.Provider value={store}>{children}</ReviewsContext.Provider>
  );
};

export const selectAvgReviewsRatingAndCount = ({ reviews }: ReviewsStore) => {
  const { length: reviewsCount } = reviews;

  const avgRating = (
    reviews.reduce((acc, { rating }) => acc + rating, 0) / reviewsCount
  ).toFixed(1);

  return { reviewsCount, avgRating };
};

export const selectReviewsSetter = (state: ReviewsStore) => state.setReviews;
