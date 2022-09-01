import { AuthInfoType } from './authInfo';
import { AuthorizationStatus } from './const';
import { CityType } from './location';
import { OffersType, OfferType } from '../types/offer';
import { ReviewsType } from './reviews';
import { SortVariants } from './sort';

export type Store = {
  user: AuthInfoType | null,
  city: CityType,
  sort: SortVariants
  offers: OffersType | [],
  nearOffers: OffersType | [],
  offer: OfferType | null,
  reviews: ReviewsType | [],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
