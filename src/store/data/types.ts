import { OffersType, OfferType } from '../../../../offer';
import { ReviewsType } from '../../types/reviews';

export type DataSliceState = {
  offers: OffersType | [],
  favoriteOffers: OffersType | [],
  nearOffers: OffersType | [],
  offer: OfferType | null,
  reviews: ReviewsType | [],
  isDataLoaded: boolean,
}
