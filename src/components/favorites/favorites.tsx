import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Header from '../layout/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFavoriteOffersAction } from '../../store/actions/api-actions';
import { selectData } from '../../store/data/selectors';
import browserHistory from '../../browser-history';
import { toast } from 'react-toastify';
import { AppRoute } from '../../types/const';
import { favoriteOffersToSectionsObject } from '../../utils/offers/favoriteOffersToSectionsObject';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { SectionsObject } from '../../../../offer';
import FavoriteOffersList from '../favorite-offers-list/favorite-offers-list';
import ReactLoading from 'react-loading';
import { LoadingVidget } from '../../types/libs/react-loading';

const UNDEFINED_ERROR_MESSAGE = 'При загрузке избранных предложений произошла неизвестная ошибка!';

const Favorites = (): JSX.Element => {
  const isMounted = useRef<boolean>(false);
  const { favoriteOffers: offers } = useAppSelector(selectData);
  const [sectionsObject, setSectionsObject] = useState<SectionsObject | null>(null);
  const dispatch = useAppDispatch() as ThunkAppDispatch;

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(fetchFavoriteOffersAction());
        isMounted.current = true;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          browserHistory.push(AppRoute.Home);
          toast.warning(UNDEFINED_ERROR_MESSAGE);
        }
      }
    }
    fetchData();

  }, []);

  if (offers.length !== 0 && sectionsObject === null) {
    setSectionsObject(favoriteOffersToSectionsObject(offers));
  }

  return (
    !isMounted.current || offers.length !== 0 ?
      (
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
            <main className='page__main page__main--favorites'>
              <div className='page__favorites-container container'>
                <section className='favorites'>
                  <h1 className='favorites__title'>Saved listing</h1>
                  {
                    sectionsObject !== null ?
                      <FavoriteOffersList sections={sectionsObject as SectionsObject} />
                      :
                      <ReactLoading color='lightGrey' width='20%' height='auto' type={LoadingVidget.spin} className='center' />
                  }
                </section>
              </div>
            </main>
            <footer className='footer container'>
              <a className='footer__logo-link' href='main.html'>
                <img
                  className='footer__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width={64}
                  height={33}
                />
              </a>
            </footer>
          </div>
        </>
      )
      :
      <FavoritesEmpty />
  );

};

export default Favorites;
