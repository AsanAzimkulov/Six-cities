import React from 'react';

import { OfferType, OffersType } from '../../types/offer';
import Offer from '../offer/offer';

type OffersListType = {
  offers: OffersType;
  onOfferHover: (id: number) => void;
};
const OffersList = ({ offers, onOfferHover }: OffersListType) => (
  <>
    {offers.map((offer: OfferType) => (
      <Offer key={offer.id} offer={offer} onHover={onOfferHover} />
    ))}
  </>
);

export { OffersList };
