import React from 'react';
import { Link, generatePath } from 'react-router-dom';

import { OfferType } from '../../types/offer';
import { AppRoute } from '../../types/const';

type OfferPropsType = {
  offer: OfferType;
  onHover: (id: number) => void;
};
const Offer = ({ offer, onHover }: OfferPropsType) => {
  const { id, price, rating, previewImage, isPremium, type, title } = offer;
  const [isFavorite, setIsFavorite] = React.useState(false);
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
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="apartment view"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button" onClick={() => setIsFavorite((prev) => !prev)}>
            <svg className="place-card__bookmark-icon" width={18} height={19} style={{
              stroke: isFavorite ? '#4481c3' : '#979797',
            }}
            >
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
