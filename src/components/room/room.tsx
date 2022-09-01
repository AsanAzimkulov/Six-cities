import React, { useState, useEffect } from 'react';
import { LoadingVidget } from '../../types/libs/react-loading';
import LoadingScreenWithBackground from '../loading-screen/ready/with-background/loading-screen-with-background';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import CommentForm from '../comment-form/comment-form';
import PropertyInsideList from '../property-inside-list/property-inside-list';
import PropertyHeadGallery from '../property-head-gallery/property-head-gallery';
import PropertyDescription from '../property-description/property-description';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import { OffersList } from '../offers-list/offers-list';
import NotFoundPage from '../not-found-page/not-found-page';
import { fetchNearOffersAction, fetchOfferAction, setFavoriteAction } from '../../store/actions/api-actions';
import { fetchReviewsAction } from '../../store/actions/api-actions';
import generatePoints from '../../utils/map/generatePoints';
import { AppRoute } from '../../types/const';
import { HttpCode } from '../../services/api';
import browserHistory from '../../browser-history';
import { toast } from 'react-toastify';
import { ThunkAppDispatch } from '../../types/action';
import { AuthorizationStatus } from '../../types/const';
import Header from './../layout/header/header';
import { loadOffer } from '../../store/data/slice';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectData } from '../../store/data/selectors';
import { selectUser } from '../../store/user/selectors';
import { selectFilter } from '../../store/filter/selectors';

const FAVORITE_TOGGLE_BAD = 'Не удалось совершить действие, попробуйте ещё раз.';

const UNDEFINED_ERROR_MESSAGE = 'При загрузке предложения произошла неизвестная ошибка!';

const Room = (): JSX.Element => {
  const dispatch = useAppDispatch() as ThunkAppDispatch;

  const onFetchOffer = (id: string) => dispatch(fetchOfferAction(id));
  const onFetchReviews = (id: string) => dispatch(fetchReviewsAction(id));
  const onFetchNearOffers = (id: string) => dispatch(fetchNearOffersAction(id));
  const onClearOffer = () => dispatch(loadOffer(null));

  const { offer, nearOffers, reviews } = useAppSelector(selectData);
  const { authorizationStatus } = useAppSelector(selectUser);
  const { city } = useAppSelector(selectFilter);

  const sortedReviews = [...reviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const { id } = useParams();
  const [isFavorite, setIsFavorite] = React.useState<boolean>(offer?.isFavorite);

  const onToggleFavorite = async () => {
    try {
      await dispatch(setFavoriteAction({ id: String(id), flag: String(+!isFavorite) }));
      setIsFavorite((prev) => !prev);
    } catch (error) {
      toast.error(FAVORITE_TOGGLE_BAD);
    }
  };


  const [noOffer, setNoOffer] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          await Promise.all([
            onFetchOffer(id),
            onFetchReviews(id),
            onFetchNearOffers(id),
          ]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === HttpCode.NOT_FOUND) {
            setNoOffer(true);
          } else {
            browserHistory.push(AppRoute.Home);
            toast.warning(UNDEFINED_ERROR_MESSAGE);
          }
        }
      }
    }
    fetchData();
    const unlisten = browserHistory.listen(onClearOffer);
    return unlisten;

  }, [id]);

  if (noOffer) {
    return <NotFoundPage />;
  }

  if (offer) {
    const {
      price,
      rating,
      isPremium,
      type,
      title,
      host,
      bedrooms,
      maxAdults,
      goods,
      images,
      description,
    } = offer;
    const nearPoints = generatePoints([...nearOffers].concat(offer));
    return (
      <>
        <div style={{ display: 'none' }}>
          <svg xmlns='http://www.w3.org/2000/svg'>
            <symbol id='icon-arrow-select' viewBox='0 0 7 4'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z'
              />
            </symbol>
            <symbol id='icon-bookmark' viewBox='0 0 17 18'>
              <path d='M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z' />
            </symbol>
            <symbol id='icon-star' viewBox='0 0 13 12'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z'
              />
            </symbol>
          </svg>
        </div>
        <div className='page'>
          <Header />
          <main className='page__main page__main--property'>
            <section className='property'>
              <PropertyHeadGallery images={images} />
              <div className='property__container container'>
                <div className='property__wrapper'>
                  {isPremium && (
                    <div className='property__mark'>
                      <span>Premium</span>
                    </div>
                  )}
                  <div className='property__name-wrapper'>
                    <h1 className='property__name'>{title}</h1>
                    <button
                      className={classNames('property__bookmark-button', 'button', { 'property__bookmark-button--active': isFavorite })}
                      type='button'
                      onClick={onToggleFavorite}
                    >
                      <svg
                        className='property__bookmark-icon'
                        width={31}
                        height={33}
                      >
                        <use xlinkHref='#icon-bookmark' />
                      </svg>
                      <span className='visually-hidden'>To bookmarks</span>
                    </button>
                  </div>
                  <div className='property__rating rating'>
                    <div className='property__stars rating__stars'>
                      <span style={{ width: `${rating * 20}%` }} />
                      <span className='visually-hidden'>Rating</span>
                    </div>
                    <span className='property__rating-value rating__value'>
                      {rating}
                    </span>
                  </div>
                  <ul className='property__features'>
                    <li className='property__feature property__feature--entire'>
                      {type}
                    </li>
                    <li className='property__feature property__feature--bedrooms'>
                      {bedrooms} Bedrooms
                    </li>
                    <li className='property__feature property__feature--adults'>
                      Max {maxAdults} adults
                    </li>
                  </ul>
                  <div className='property__price'>
                    <b className='property__price-value'>€{price}</b>
                    <span className='property__price-text'>&nbsp; night</span>
                  </div>
                  <div className='property__inside'>
                    <h2 className='property__inside-title'>What&#39; inside</h2>
                    <PropertyInsideList list={goods} />
                  </div>
                  <div className='property__host'>
                    <h2 className='property__host-title'>Meet the host</h2>
                    <div className='property__host-user user'>
                      <div
                        className={classNames(
                          'property__avatar-wrapper',
                          { 'property__avatar-wrapper--pro': host.isPro },
                          'user__avatar-wrapper'
                        )}
                      >
                        <img
                          className='property__avatar user__avatar'
                          src={host.avatarUrl}
                          width={74}
                          height={74}
                          alt='Host avatar'
                        />
                      </div>
                      <span className='property__user-name'>{host.name}</span>
                      <span className='property__user-status'>
                        {host.isPro && 'Pro'}
                      </span>
                    </div>
                    <PropertyDescription text={description} />
                  </div>
                  <section className='property__reviews reviews'>
                    <h2 className='reviews__title'>
                      Reviews ·{' '}
                      <span className='reviews__amount'>{reviews.length}</span>
                    </h2>
                    <ReviewsList reviews={sortedReviews.slice(0, 10)} />
                    {
                      authorizationStatus === AuthorizationStatus.Auth && <CommentForm />
                    }
                  </section>
                </div>
              </div>
              <section className='property__map map'>
                <Map
                  selectedPoint={{ ...offer.location, id: offer.id }}
                  points={nearPoints}
                  city={city}
                  roomPage
                />
              </section>
            </section>
            <div className='container'>
              <section className='near-places places'>
                <h2 className='near-places__title'>
                  Other places in the neighbourhood
                </h2>
                <div className='near-places__list places__list'>
                  <OffersList
                    onOfferHover={() => null}
                    offers={nearOffers.slice(0, 3)}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>
      </>
    );
  } else {
    return (
      <LoadingScreenWithBackground label={'loading...'} color={'#fff'} labelColor={'#9fdfed'} type={LoadingVidget.bars} />
    );
  }
};

export default Room;
