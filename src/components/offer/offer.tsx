import React from 'react';
import classNames from 'classnames';
import { Link, generatePath } from 'react-router-dom';

import { OfferType } from '../../../../offer';
import { AppRoute } from '../../types/const';
import { useAppDispatch } from '../../hooks/redux';
import { setFavoriteAction } from '../../store/actions/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { toast } from 'react-toastify';

const FAVORITE_TOGGLE_BAD = 'Не удалось совершить действие, попробуйте ещё раз.';

type OfferPropsType = {
  offer: OfferType;
  onHover: (id: number) => void;
};
const Offer = ({ offer, onHover }: OfferPropsType) => {
  const { id, price, rating, previewImage, isPremium, type, title, isFavorite: favorited } = offer;
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const dispatch = useAppDispatch() as ThunkAppDispatch;

  const onToggleFavorite = async () => {
    try {
      await dispatch(setFavoriteAction({ id: String(id), flag: String(+!isFavorite) }));
      setIsFavorite((prev) => !prev);
    } catch (error) {
      toast.error(FAVORITE_TOGGLE_BAD);
    }
  };
  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={(evt) => {
        onHover(id);
      }}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={previewImage}
          width={260}
          height={200}
          alt="apartment view"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={classNames('place-card__bookmark-button', 'button', { 'place-card__bookmark-button--active': isFavorite })} type="button" onClick={onToggleFavorite}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: id.toString() })}>{title}</Link>
        </h2>
        <p className="place-card__type">
          {type[0].toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  );
};

export default Offer;
