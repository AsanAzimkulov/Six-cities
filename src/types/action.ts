import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { changeCity, changeSort, loadNearOffers, loadOffer, loadOffers, loadReviews, requireLogout, setUser } from '../store/actions/action';
import { Store } from './store';
import { requireAuthorization, redirectToRoute } from './../store/actions/action';
import { AxiosInstance } from 'axios';

export enum ActionType {
  LoadOffers = 'data/loadOffers',
  LoadNearOffers = 'data/loadNearOffers',
  LoadOffer = 'data/loadOffer',
  ChangeCity = 'filter/changeCity',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
  ChangeSort = 'sort/changeSort',
  SetUser = 'user/setUser',
  LoadReviews = 'data/loadReviews',
  SetDataLoaded = 'data/setDataLoaded',
}

export type Actions =
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadOffer>
  | ReturnType<typeof loadReviews>
  | ReturnType<typeof changeCity>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof setUser>
  | ReturnType<typeof loadNearOffers>

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Actions>;

