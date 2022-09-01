import { OffersType, OfferType } from '../../types/offer';
import { ReviewsType } from '../../types/reviews';

export type DataSliceState = {
  offers: OffersType | [],
  favoriteOffers: OffersType | [],
  nearOffers: OffersType | [],
  offer: OfferType | null,
  reviews: ReviewsType | [],
  isDataLoaded: boolean,
}
