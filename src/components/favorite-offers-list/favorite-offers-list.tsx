import React from 'react';


import {OffersType, OfferType} from '../../types/offer';
import FavoriteOffer from '../comment-form/favorite-offer/favorite-offer';

type FavoriteOffersListType = {
  offers: OffersType;
};
const FavoriteOffersList = ({ offers }: FavoriteOffersListType) => (
  <>
    {offers.map((offer: OfferType) => (
      <FavoriteOffer key={offer.id} offer = {offer} />
    ))}
  </>
);

export { FavoriteOffersList };
