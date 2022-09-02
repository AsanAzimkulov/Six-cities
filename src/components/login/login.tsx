import { FormEvent, useEffect, useRef } from 'react';
import { ThunkAppDispatch } from '../../types/action';
import { OfferType } from '../../types/offer';
import { AuthData } from '../../types/user';
import { loginAction } from '../../store/actions/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Header from '../layout/header/header';
import { selectUser } from '../../store/user/selectors';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { redirectToRoute } from '../../store/actions/action';
import { toast } from 'react-toastify';
import { CityNames } from '../../types/location';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { selectData } from '../../store/data/selectors';
import { changeCity } from '../../store/filter/slice';
import { searchImages } from '../../services/imageSearchApi';
import randomNumber from '../../utils/id/randomNumber';
// import debounce from 'debounce';


const Login = (): JSX.Element => {

  const dispatch = useAppDispatch() as ThunkAppDispatch;

  const onSubmit = (authData: AuthData) => dispatch(loginAction(authData));
  const { authorizationStatus } = useAppSelector(selectUser);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Home));
    }
  }, []);

  const { offers } = useAppSelector(selectData);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const randomCityIndex = randomNumber(1, 6);

  const cities = Object.values(CityNames);
  const randomCity = cities[randomCityIndex];

  const backgroundImage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function saveImage() {
      console.log(99);
      const searchImagesInner = await searchImages();
      const randomCityImageUrl = await searchImagesInner(`${randomCity} Beautiful city high quality`).then((res: any) => res.value[randomNumber(1, 45)].url);
      console.log(randomCityImageUrl);
      if (backgroundImage.current && randomCityImageUrl) {
        backgroundImage.current.style.backgroundImage = `url(${randomCityImageUrl})`;
      }
    }
    saveImage();
  }, []);


  const onChangeCity = () => {
    const offerWithSameCity = offers.find((offer: OfferType) => offer.city.name === randomCity) as OfferType;

    dispatch(changeCity(offerWithSameCity.city));
  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (passwordRef.current !== null && loginRef.current !== null) {
      const regex = /^(?=.*\d)(?=.*[^0-9]).*$/;
      // Check if string contians at least one letter and digit
      const doesPasswordHaveNumberAndLetter = regex.test(passwordRef.current.value);

      if (doesPasswordHaveNumberAndLetter) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value
        });
      } else {
        toast.info('Password must contain at least one letter and digit');
      }
    } else {
      toast.error('Вo not leave the fields empty!');
    }
  };
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
      <div className='page page--gray page--login' ref={backgroundImage}>
        <Header isAuthPage />
        <main className='page__main page__main--login'>
          <div className='page__login-container container'>
            <section className='login'>
              <h1 className='login__title'>Sign in</h1>
              <form className='login__form form' action='#' method='post' onSubmit={handleSubmit}>
                <div className='login__input-wrapper form__input-wrapper'>
                  <label className='visually-hidden'>E-mail</label>
                  <input
                    className='login__input form__input'
                    type='email'
                    name='email'
                    placeholder='Email'
                    ref={loginRef}
                    required
                  />
                </div>
                <div className='login__input-wrapper form__input-wrapper'>
                  <label className='visually-hidden'>Password</label>
                  <input
                    className='login__input form__input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    ref={passwordRef}
                    required
                  />
                </div>
                <button
                  className='login__submit form__submit button'
                  type='submit'

                >
                  Sign in
                </button>
              </form>
            </section>
            <section className='locations locations--login locations--current'>
              <div className='locations__item'>
                <Link to={generatePath(AppRoute.Home)}
                  className='locations__item-link'
                  onClick={onChangeCity}
                >
                  <span>{randomCity}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div >
    </>
  );
};


export default Login;
export { Login };


