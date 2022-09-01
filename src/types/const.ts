export enum AppRoute {
  Home = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offers/:id',
}

export enum APIRoute {
  Offers = '/hotels',
  FavoriteOffers = '/favorite',
  NearOffers = '/hotels/:id/nearby',
  Login = '/login',
  Logout = '/logout',
  Offer = '/hotels/:id',
  OfferFavoriteStatus = '/favorite/:id/:status',
  Reviews = '/comments/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

