'use client';
import { useState } from 'react';

import type { Review } from '@/api/types';

export default function Reviews({
  reviews,
  addReviewAction,
}: {
  reviews: Review[];
  addReviewAction: (text: string, rating: number) => Promise<Review[]>;
}) {
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  return (
    <>
      {reviews?.map((review, index) => (
        <div key={index} className="p-5">
          <div className="text-md my-1 leading-5 text-gray-300">
            {review.rating} stars
          </div>
          <div className="mt-1 text-sm font-light italic leading-5 text-gray-300">
            {review.text}
          </div>
        </div>
      ))}
      <form
        onSubmit={async evt => {
          evt.preventDefault();
          await addReviewAction(reviewText, reviewRating);
          setReviewText('');
          setReviewRating(5);
        }}
      >
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="review-text">Review</label>
          <input
            id="review-text"
            className="flex-grow rounded-md border border-gray-300 bg-gray-900 p-2 text-white"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <label htmlFor="review-rating">Rating</label>
          <input
            id="review-rating"
            className="rounded-md border border-gray-300 bg-gray-900 p-2 text-white"
            type="number"
            min={1}
            max={5}
            value={reviewRating}
            onChange={e => setReviewRating(+e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={!reviewText}
            className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-500"
            onClick={async () => void 0}
          >
            Submit Review
          </button>
        </div>
      </form>
    </>
  );
}
