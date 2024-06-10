'use client';
import { useState } from 'react';

import { useReviews } from './ReviewsContext';

import type { Review } from '@/api/types';
import type { FormEvent } from 'react';

export const Reviews = ({
  addReviewAction,
}: {
  addReviewAction: (text: string, rating: number) => Promise<Review[]>;
}) => {
  const [reviews, setReviews] = useReviews();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  // TODO: add isLoading

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const updatedReviews = await addReviewAction(reviewText, reviewRating);
    setReviews(updatedReviews);
    setReviewText('');
    setReviewRating(5);
  };

  const reviewsList = reviews.map(({ rating, text }, index) => (
    <div key={index} className="p-5">
      <div className="text-md my-1 leading-5 text-gray-300">{rating} stars</div>
      <div className="mt-1 text-sm font-light italic leading-5 text-gray-300">
        {text}
      </div>
    </div>
  ));

  const addReviewForm = (
    <form onSubmit={onSubmit}>
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="review-text">Review</label>
        <input
          id="review-text"
          type="text"
          className="flex-grow rounded-md border border-gray-300 bg-gray-900 p-2 text-white"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        />

        <label htmlFor="review-rating">Rating</label>
        <input
          id="review-rating"
          type="number"
          className="rounded-md border border-gray-300 bg-gray-900 p-2 text-white"
          min={1}
          max={5}
          value={reviewRating}
          onChange={e => setReviewRating(+e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!reviewText}
          className="mt-6 rounded-lg bg-blue-800 px-8 py-2 text-lg font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Submit Review
        </button>
      </div>
    </form>
  );

  return (
    <>
      {reviewsList}
      {addReviewForm}
    </>
  );
};
