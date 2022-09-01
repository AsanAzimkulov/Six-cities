import React from 'react';
import { CityNames } from '../../types/location';
import { OffersType, SectionsObject } from '../../../../offer';
import FavoriteOffersListItem from '../favorite-offers-list-item/favorite-offers-list-item';


type TFavoriteOffersList = {
  sections: SectionsObject
}

const FavoriteOffersList = ({ sections }: TFavoriteOffersList) => {

  const keys = Object.keys(sections);

  return (
    <ul className='favorites__list'>
      {
        keys.map((key) => {
          const section = {
            city: key as CityNames,
            offers: sections[key as CityNames] as OffersType,
          };
          return <FavoriteOffersListItem section={section} key={key} />;
        })
      }
    </ul>
  );
};


export default FavoriteOffersList;
