'use client';
import { /* useRef, */ useState } from 'react';
// import { useDispatch, useStore } from 'react-redux';

import { useReviews } from '@/app/store/ReviewsProvider';
// import { setReviews, useReviews } from '@/app/store/reviewsSlice';

import type { Review /* ReviewsArray */ } from '@/api/types';
// import type { RootState } from '@/app/store/store';
import type { FormEvent } from 'react';

export const Reviews = ({
  addReviewAction,
}: {
  addReviewAction: (text: string, rating: number) => Promise<Review[]>;
}) => {
  // const store = useStore<RootState>();
  // const initialized = useRef(false);

  // if (!initialized.current) {
  //   store.dispatch(setReviews(initialReviews));
  //   initialized.current = true;
  // }

  // const reviews: never[] = []; // useReviews();
  const { reviews, setReviews } = useReviews()();

  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  // TODO: add isLoading

  // const dispatch = useDispatch();

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (reviewText.length > 1024) {
      alert('Max review length is 1024 symbols');
      return;
    }
    const reviewsFromServer = await addReviewAction(reviewText, reviewRating);
    // dispatch(setReviews(updatedReviews));
    setReviews(reviewsFromServer);
    setReviewText('');
    setReviewRating(5);
  };

  const reviewsList = reviews.map(({ rating, text }, index) => (
    <div key={index} className="flex flex-col gap-1 p-5 pt-6">
      <div className="text-md leading-5 text-gray-300">{rating} stars</div>
      <div className="break-words text-sm font-light italic leading-5 text-gray-300">
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
          maxLength={1024}
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
