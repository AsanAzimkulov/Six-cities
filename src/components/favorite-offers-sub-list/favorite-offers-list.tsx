import React from 'react';


import { OffersType, OfferType } from '../../types/offer';
import FavoriteOffer from '../favorite-offer/favorite-offer';

type FavoriteOffersListType = {
  offers: OffersType;
};
const FavoriteOffersSubList = ({ offers }: FavoriteOffersListType) => (
  <>
    {offers.map((offer: OfferType) => (
      <FavoriteOffer key={offer.id} offer={offer} />
    ))}
  </>
);


export { FavoriteOffersSubList };
