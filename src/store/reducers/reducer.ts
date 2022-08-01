
import { Actions, ActionType } from '../../types/action';
import { Paris } from '../../mocks/city';
import { Store } from '../../types/store';
import { AuthorizationStatus } from '../../types/const';
import { OffersType, OfferType } from '../../types/offer';
import { SortVariants } from '../../types/sort';
import { CityType } from '../../types/location';
import { AuthInfoType } from '../../types/authInfo';
import { ReviewsType } from '../../types/reviews';

export const initialState: Store = {
  user: null,
  city: Paris,
  sort: SortVariants.Popular,
  offers: [],
  nearOffers: [],
  offer: null,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};


export const reducer = (state: Store = initialState, action: Actions): Store => {
  switch (action.type) {
    case ActionType.SetDataLoaded:
      return {
        ...state,
        isDataLoaded: action.payload as unknown as boolean,
      };
    case ActionType.SetUser:
      return {
        ...state,
        user: action.payload as unknown as AuthInfoType
      };
    case ActionType.ChangeCity:
      return {
        ...state,
        city: action.payload as unknown as CityType
      };
    case ActionType.ChangeSort:
      return {
        ...state,
        sort: action.payload as unknown as SortVariants
      };
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload as OffersType,
        isDataLoaded: true,
      };
    case ActionType.LoadNearOffers:
      return {
        ...state,
        nearOffers: action.payload as OffersType,
      };
    case ActionType.LoadOffer:
      return {
        ...state,
        offer: action.payload as unknown as OfferType,
      };
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: action.payload as unknown as ReviewsType
      };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload as unknown as AuthorizationStatus
      };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    default:
      return state;
  }

};
