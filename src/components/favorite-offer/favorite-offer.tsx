import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFavoriteAction } from '../../store/actions/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { AppRoute } from '../../types/const';

import { OfferType } from '../../types/offer';
import { selectData } from '../../store/data/selectors';
import { loadFavoriteOffers } from '../../store/data/slice';
import { toast } from 'react-toastify';

const FAVORITE_BAD_POST = 'Не удалось удалить из избранного, попробуйте ещё раз';


type FavoriteOfferPropsType = {
  offer: OfferType,
};

const FavoriteOffer = ({ offer }: FavoriteOfferPropsType) => {
  const { price, rating, previewImage, type, title, id, isFavorite: favorited } = offer;

  const { favoriteOffers } = useAppSelector(selectData);

  const isFavorited = favoriteOffers.some((favoriteOffer: OfferType) => favoriteOffer.id === id);

  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const dispatch = useAppDispatch() as ThunkAppDispatch;

  const onToggleFavorite = async () => {
    try {
      await dispatch(setFavoriteAction({ id: String(id), flag: String(+!isFavorite) }));
      setIsFavorite((prev) => !prev);
      dispatch(loadFavoriteOffers(
        [...favoriteOffers].filter(({ id: previd }) => previd !== id)
      ));
    } catch (error) {
      toast.error(FAVORITE_BAD_POST);
    }
  };
  if (!isFavorited) { return <p></p>; }

  return (
    <article className='favorites__card place-card'>
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src={previewImage}
            width={150}
            height={110}
            alt='Favorite Offer View'
          />
        </a>
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>€{price}</b>
            <span className='place-card__price-text'>/&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
            onClick={onToggleFavorite}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19} style={{
              fill: isFavorite ? '#4481c3' : '#979797',
              stroke: isFavorite ? '#4481c3' : '#979797'
            }}
            >
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${rating * 20}%` }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={generatePath(AppRoute.Offer, { id: id.toString() })}>{title}</Link>
        </h2>
        <p className='place-card__type'>{type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};

export default FavoriteOffer;
