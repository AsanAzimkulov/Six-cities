import React from 'react';
import { CityNames } from '../../types/location';
import { OffersType } from '../../types/offer';
import { FavoriteOffersSubList } from '../favorite-offers-sub-list/favorite-offers-list';

type TFavoriteOffersListItem = {
  section: {
    city: CityNames,
    offers: OffersType
  }
}

const FavoriteOffersListItem = ({ section }: TFavoriteOffersListItem) => (
  <li className='favorites__locations-items'>
    <div className='favorites__locations locations locations--current'>
      <div className='locations__item'>
        <a className='locations__item-link' href='#'>
          <span>{section.city}</span>
        </a>
      </div>
    </div>
    <div className='favorites__places'>
      <FavoriteOffersSubList offers={section.offers} />
    </div>
  </li>
);


export default FavoriteOffersListItem;
