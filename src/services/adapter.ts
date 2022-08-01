import { OffersType, OfferType } from '../types/offer';
import { keysToCamel } from '../utils/work-with-strings/convertCases';
import { serverDataOffersType, serverDataOfferType, serverDataAuthInfoType, serverDataReviewsType, serverDataReviewType} from '../types/server-data';
import { AuthInfoType } from '../types/authInfo';
import { ReviewsType, ReviewType } from '../types/reviews';

const adaptOffers = (offers: serverDataOffersType): OffersType => offers.map((offer: serverDataOfferType) => keysToCamel(offer) as OfferType);
const adaptOffer = (offer: serverDataOfferType) => keysToCamel(offer) as OfferType;
const adaptAuthInfo = (authInfo: serverDataAuthInfoType): AuthInfoType => keysToCamel(authInfo) as AuthInfoType;
const adaptReviews = (reviews: serverDataReviewsType): ReviewsType => reviews.map((review: serverDataReviewType) => keysToCamel(review) as ReviewType);


export {adaptOffers, adaptAuthInfo, adaptReviews, adaptOffer};
