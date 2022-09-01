import { ActionType } from '../../types/action';
// import { AuthorizationStatus } from '../../types/const';
// import { CityType } from '../../types/location';
// import { ReviewsType } from '../../types/reviews';
// import { OffersType, OfferType } from '../../types/offer';
import { AppRoute } from '../../types/const';
// import { SortVariants } from '../../types/sort';
// import { AuthInfoType } from '../../types/authInfo';

// export const changeCity = (city: CityType) => ({
//   type: ActionType.ChangeCity,
//   payload: city
// });

// export const changeSort = (sort: SortVariants) => ({
//   type: ActionType.ChangeSort,
//   payload: sort
// });


// export const loadOffers = (offers: OffersType) => ({
//   type: ActionType.LoadOffers,
//   payload: offers
// } as const);

// export const loadNearOffers = (offers: OffersType) => ({
//   type: ActionType.LoadNearOffers,
//   payload: offers
// } as const);

// export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
//   type: ActionType.RequireAuthorization,
//   payload: authStatus
// } as const);

// export const requireLogout = () => ({
//   type: ActionType.RequireLogout
// } as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);


// export const setUser = (user: AuthInfoType | null) => ({
//   type: ActionType.SetUser,
//   payload: user
// } as const);

// export const loadOffer = (offer: OfferType | null) => ({
//   type: ActionType.LoadOffer,
//   payload: offer,
// } as const);

// export const loadReviews = (comments: ReviewsType | null) => ({
//   type: ActionType.LoadReviews,
//   payload: comments,
// } as const);

// export const setDataLoaded = (isLoaded: boolean) => ({
//   type: ActionType.SetDataLoaded,
//   payload: isLoaded,
// });
