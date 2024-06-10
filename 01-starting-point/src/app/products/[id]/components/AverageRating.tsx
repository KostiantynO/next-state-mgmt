'use client';

import { useReviews } from './ReviewsContext';

export const AverageRating = () => {
  const [reviews] = useReviews();

  const { length: reviewsCount } = reviews;

  const avgRating = (
    reviews.reduce((acc, { rating }) => acc + rating, 0) / reviewsCount
  ).toFixed(1);

  return (
    <>
      {reviewsCount && (
        <div className="mt-4 font-light">Average Rating: {avgRating}</div>
      )}
    </>
  );
};
