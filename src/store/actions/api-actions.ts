import { ReviewPostType } from './../../types/reviews';
import { ThunkActionResult } from '../../types/action';
import { APIRoute, AuthorizationStatus } from '../../types/const';
import { AuthData } from '../../types/user';
import { redirectToRoute } from './action';
import { loadOffer, loadOffers, loadReviews, loadNearOffers, loadFavoriteOffers } from '../data/slice';
import { requireAuthorization, setUser, requireLogout } from '../user/slice';
import { setToken, dropToken } from '../../services/token';
import { AppRoute } from '../../types/const';
import { toast } from 'react-toastify';
import { adaptOffers, adaptOffer, adaptAuthInfo, adaptReviews } from '../../services/adapter';
import { TFavoriteOfferData } from '../../../../offer';
import { serverDataOffersType, serverDataOfferType, serverDataAuthInfoType, serverDataReviewsType } from '../../types/server-data';
import axios from 'axios';
import { HttpCode } from '../../services/api';
import { generatePath } from 'react-router-dom';

const START_UNAUTHORIZED = 'Не забудьте авторизоваться!';

const SERVER_UNAVAILABLE = 'Сейчас сервер недоступен, попробуйте позже, или свяжитесь с администратором сайта.';

const POST_UNAUTHORIZED = 'Необходимо зарегистрироваться!';

const ADMIN_EMAIL = 'azimkulov40@gmail.com';
const ADMIN_TELEGRAM = 'https://t.me/Soiijjjj';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';
const AUTH_ERROR = 'Не удалось получить данные о пользователе, попробуйте ещё раз!';
const AUTH_UNDEFINED_ERROR = 'Произошла неизвестная ошибка, свяжитесь с администартором сайта или попробуйте чуть позже';

const LOGIN_BAD_REQUEST = 'Данные были неверно отправлены по неизвестной причине, свяжитесь с администратором сайта или попробуйте ещё раз!';

const REVIEWS_BAD_POST = 'Не удалось отправить данные формы, попробуйте ещё раз';

const MAX_AUTH_REQUESTS_BY_OWN = 3;
let CURRENT_AUTH_REQUEST_BY_OWN = 0;

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<serverDataOffersType>(APIRoute.Offers);
    const offers = adaptOffers(data);
    dispatch(loadOffers(offers));
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<serverDataOffersType>(APIRoute.FavoriteOffers);
    const offers = adaptOffers(data);
    dispatch(loadFavoriteOffers(offers));
  };

export const fetchNearOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<serverDataOffersType>(generatePath(APIRoute.NearOffers, { id }));
    const offers = adaptOffers(data);
    dispatch(loadNearOffers(offers));
  };

export const fetchOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<serverDataOfferType>(generatePath(APIRoute.Offer, { id }));
    const offer = adaptOffer(data);
    dispatch(loadOffer(offer));
  };


export const fetchReviewsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<serverDataReviewsType>(generatePath(APIRoute.Reviews, { id }));
    const reviews = adaptReviews(data);
    dispatch(loadReviews(reviews));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, getState, api) => {
    try {
      await api.get<serverDataAuthInfoType>(APIRoute.Login)
        .then(({ data }) => {
          const user = adaptAuthInfo(data);
          dispatch(setUser(user));
          dispatch(requireAuthorization(AuthorizationStatus.Auth));
        });
    } catch (er) {
      if (axios.isAxiosError(er)) {
        if (er.response?.status === HttpCode.UNAVAILABLE) {
          toast.error(SERVER_UNAVAILABLE, { autoClose: 3000 });
          setTimeout(() => {
            toast(ADMIN_EMAIL, {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            toast(ADMIN_TELEGRAM, {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }, 3000);
          return;
        }
        if (er.response?.status === HttpCode.UNAUTHORIZED) {
          toast.warn(START_UNAUTHORIZED, { position: 'top-center' });
          dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          return;
        }
        if (er.response?.status.toString().startsWith('5') && er.response?.status.toString().length === 3) { // server error (500)
          toast.info(AUTH_FAIL_MESSAGE);
        } else {
          if (CURRENT_AUTH_REQUEST_BY_OWN < MAX_AUTH_REQUESTS_BY_OWN && getState().authorizationStatus === AuthorizationStatus.Unknown) { //keep trying connect
            dispatch(checkAuthAction);
            CURRENT_AUTH_REQUEST_BY_OWN += 1;
          } else { // attempts are over
            CURRENT_AUTH_REQUEST_BY_OWN = 0;
            toast.error(AUTH_ERROR);

          }
        }
      } else {
        toast.error(AUTH_UNDEFINED_ERROR);
      }

    }
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<serverDataAuthInfoType>(APIRoute.Login, { email, password });
      const user = adaptAuthInfo(data);
      setToken(user.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(user));
      dispatch(redirectToRoute(AppRoute.Home));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(LOGIN_BAD_REQUEST);
      }
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(setUser(null));
  };

export const setFavoriteAction = ({ id, flag }: TFavoriteOfferData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<serverDataOfferType>(generatePath(APIRoute.OfferFavoriteStatus, { id, status: flag }));
      dispatch(loadOffer(adaptOffer(data)));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.UNAUTHORIZED) {
          dispatch(redirectToRoute(AppRoute.Login));
          toast.error(POST_UNAUTHORIZED);
        }
      }
      throw new Error('Error in setFavoriteAction');
    }
  };

export const setReviewAction = ({ review, id }: { review: ReviewPostType, id: string }): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<serverDataReviewsType>(generatePath(APIRoute.Reviews, { id }), review);
      const reviews = adaptReviews(data);
      dispatch(loadReviews(reviews));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(REVIEWS_BAD_POST);
      }
    }
  };


