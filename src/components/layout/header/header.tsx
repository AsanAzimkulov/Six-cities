import React from 'react';
import { AppRoute, AuthorizationStatus } from '../../../types/const';
import { Link } from 'react-router-dom';
import { ThunkAppDispatch } from '../../../types/action';
import { logoutAction } from '../../../store/actions/api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectUser } from '../../../store/user/selectors';

type HeaderProps = {
  isAuthPage?: boolean,
}

const Header = ({
  isAuthPage = false,
}: HeaderProps
) => {
  const dispatch = useAppDispatch() as ThunkAppDispatch;
  const onSignOut = () => dispatch(logoutAction());
  const {user, authorizationStatus} = useAppSelector(selectUser);
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Link to={AppRoute.Home} className='header__logo-link header__logo-link--active'>
              <img
                className='header__logo'
                src='img/logo.svg'
                alt='6 cities logo'
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className='header__nav'>
            {
              !isAuthPage && (
                <ul className='header__nav-list'>
                  {
                    authorizationStatus === AuthorizationStatus.NoAuth
                      ?
                      (
                        <>
                          <li className="header__nav-item user">
                            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                              <div className="header__avatar-wrapper user__avatar-wrapper" style={{ marginRight: 0 }}></div>
                            </Link>
                          </li>
                          <li className="header__nav-item">
                            <Link className="header__nav-link" to={AppRoute.Login}>
                              <span className="header__signout">Sign in</span>
                            </Link>
                          </li>
                        </>
                      )
                      :
                      (
                        <>
                          <li className="header__nav-item user">
                            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                              <div className="header__avatar-wrapper user__avatar-wrapper" style={{ width: '30px', height: '30px' }}>
                                <img src={user?.avatarUrl} alt={`${user?.name}'s user Avatar`} style={{ borderRadius: '50%' }} />
                              </div>
                              <span className="header__user-name user__name">{user?.email}</span>
                            </Link>
                          </li>
                          <li className="header__nav-item" onClick={onSignOut}>
                            <Link className="header__nav-link" to={AppRoute.Home}>
                              <span className="header__signout">Sign out</span>
                            </Link>
                          </li>
                        </>
                      )
                  }
                </ul>
              )
            }
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
