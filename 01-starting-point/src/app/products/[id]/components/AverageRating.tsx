'use client';
import type { Review } from '@/api/types';

export const AverageRating = ({ reviews }: { reviews: Review[] }) => (
  <>
    {reviews?.length && (
      <div className="mt-4 font-light">
        Average Rating:{' '}
        {(reviews?.reduce((a, b) => a + b.rating, 0) / reviews?.length).toFixed(
          1
        )}
      </div>
    )}
  </>
);
