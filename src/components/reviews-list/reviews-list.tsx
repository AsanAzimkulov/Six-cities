import React from 'react';

import { ReviewsType } from '../../types/reviews';
import Review from '../review/review';

type ReviewsListProps = {
  reviews: ReviewsType;
};

const ReviewsList = ({ reviews }: ReviewsListProps) =>(
  <ul className='reviews__list'>
    {
      reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))
    }
  </ul>
);

export default ReviewsList;
