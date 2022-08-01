import React from 'react';
import { Store } from '../../types/store';
import { FavoriteOffersList } from '../favorite-offers-list/favorite-offers-list';
import { connect, ConnectedProps } from 'react-redux';


const mapStateToProps = ({offers}: Store) => ({
  offers
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Favorites = ({offers}: PropsFromRedux): JSX.Element => {
  const amsterdamOffers = offers.slice(0, 2);
  const cologneOffers = offers.slice(2, 3);

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
        <header className='header'>
          <div className='container'>
            <div className='header__wrapper'>
              <div className='header__left'>
                <a className='header__logo-link' href='main.html'>
                  <img
                    className='header__logo'
                    src='img/logo.svg'
                    alt='6 cities logo'
                    width={81}
                    height={41}
                  />
                </a>
              </div>
              <nav className='header__nav'>
                <ul className='header__nav-list'>
                  <li className='header__nav-item user'>
                    <a
                      className='header__nav-link header__nav-link--profile'
                      href='#'
                    >
                      <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                      <span className='header__user-name user__name'>
                        Oliver.conner@gmail.com
                      </span>
                    </a>
                  </li>
                  <li className='header__nav-item'>
                    <a className='header__nav-link' href='#'>
                      <span className='header__signout'>Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className='page__main page__main--favorites'>
          <div className='page__favorites-container container'>
            <section className='favorites'>
              <h1 className='favorites__title'>Saved listing</h1>
              <ul className='favorites__list'>
                <li className='favorites__locations-items'>
                  <div className='favorites__locations locations locations--current'>
                    <div className='locations__item'>
                      <a className='locations__item-link' href='#'>
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className='favorites__places'>
                    <FavoriteOffersList offers={amsterdamOffers} />
                  </div>
                </li>
                <li className='favorites__locations-items'>
                  <div className='favorites__locations locations locations--current'>
                    <div className='locations__item'>
                      <a className='locations__item-link' href='#'>
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className='favorites__places'>
                    <FavoriteOffersList offers={cologneOffers} />
                  </div>
                </li>
              </ul>
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
  );
};

export default connector(Favorites);
export {Favorites};
