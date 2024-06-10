'use client';
import { createContext, useContext, useState } from 'react';

import type { ReviewsArray } from '@/api/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

const useReviewsState = (initReviews: ReviewsArray) =>
  useState<ReviewsArray>(initReviews);

type ReviewsState = [ReviewsArray, Dispatch<SetStateAction<ReviewsArray>>];

export const ReviewsContext = createContext<ReviewsState | null>(null);

export const useReviews = () => {
  const reviews = useContext(ReviewsContext);

  if (!reviews)
    throw new Error('useReviews must be used within a ReviewProvider');

  return reviews;
};

export const ReviewsProvider = ({
  initReviews,
  children,
}: {
  initReviews: ReviewsArray;
  children: ReactNode;
}) => {
  const reviewsState = useReviewsState(initReviews);

  return (
    <ReviewsContext.Provider value={reviewsState}>
      {children}
    </ReviewsContext.Provider>
  );
};
