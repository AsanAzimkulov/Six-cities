import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { setReviewAction } from '../../store/actions/api-actions';
import { ThunkAppDispatch } from '../../types/action';
// import { toast } from 'react-toastify';
import { ReviewPostType } from '../../types/reviews';

const CommentForm = () => {
  const dispatch = useAppDispatch() as ThunkAppDispatch;

  const [isSending, setIsSending] = useState(false);

  const ratingTitles = ['Void Response', 'Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Perfect'];

  const { register, handleSubmit, setValue, reset, formState: { errors, isDirty, isValid }, getValues } = useForm<ReviewPostType>({ defaultValues: { comment: '', rating: 0 } });

  const { id } = useParams();

  async function request(data: ReviewPostType) {
    if (!id) { return; }
    try {
      await dispatch(setReviewAction({ review: data, id}));
      reset();
    } finally {
      setIsSending(false);
    }
  }

  const onSubmit = handleSubmit((data) => {
    request(data);
  });

  return (
    <form className='reviews__form form' action='#' method='post' onSubmit={onSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className={classNames('reviews__rating-form', 'form__rating', { 'form__rating--error': errors.rating })}>
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <>
              <input
                className='form__rating-input visually-hidden'
                {...register('rating', { required: { value: star === 1, message: 'Please, choose rating of appartment' } })}
                value={star}
                id={`${star}-stars`}
                type='radio'
                defaultChecked={getValues('rating') === star}
                disabled={isSending}
              />
              <label
                htmlFor={`${star}-stars`}
                className={classNames('reviews__rating-label', 'form__rating-label', { 'form__rating-label--disabled': isSending })}
                title={ratingTitles[star]}
                onClick={() => setValue('rating', star)}
              >
                <svg className='form__star-image' width={37} height={33}>
                  <use xlinkHref='#icon-star' />
                </svg>
              </label>
            </>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        {...register('comment', { required: 'It\'s required', minLength: { value: 50, message: 'Minimum 50 characters is required' }, maxLength: { value: 300, message: `Maximum 300 characters, you must to remove ${getValues('comment').length - 300} characters` } })}
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={(evt) => setValue('comment', evt.target.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })}
        disabled={isSending}
      />
      {errors.comment && <p className="form__error-label">{errors.comment.message}</p>}
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set
          <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={!isDirty || !isValid || isSending}
        >
          Submit
        </button>
      </div>
    </form >
  );
};

export default CommentForm;
