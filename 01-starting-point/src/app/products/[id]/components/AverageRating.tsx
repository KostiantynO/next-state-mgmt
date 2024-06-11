'use client';

// import { useRef } from 'react';
// import { useStore } from 'react-redux';

// import { setReviews, useReviews } from '@/app/store/reviewsSlice';

import {
  selectAvgReviewsRatingAndCount,
  useReviews,
} from '@/app/store/ReviewsProvider';

// import type { ReviewsArray } from '@/api/types';
// import type { RootState } from '@/app/store/store';

export const AverageRating = () => {
  // const store = useStore<RootState>();
  // const initialized = useRef(false);

  // if (!initialized.current) {
  //   store.dispatch(setReviews(initialReviews));
  //   initialized.current = true;
  // }

  // const reviews = useReviews();
  const { avgRating, reviewsCount } = useReviews()(
    selectAvgReviewsRatingAndCount
  );

  return (
    <marquee>
      {reviewsCount && (
        <div className="mt-4 font-light">Average Rating: {avgRating}</div>
      )}
    </marquee>
  );
};
