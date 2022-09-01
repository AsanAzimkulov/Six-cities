import { CityNames } from '../../types/location';
import { OffersType } from '../../types/offer';
import clone from 'just-clone';
import { SectionsObject } from '../../types/offer';

export const favoriteOffersToSectionsObject = (favoriteOffers: OffersType): SectionsObject => {
  const offers = clone(favoriteOffers);
  offers.sort((a, b) => a.city.name.toLowerCase().localeCompare(b.city.name.toLowerCase()));
  let currentCityName: CityNames = offers[0].city.name;

  const sectionsObject: { [key in string]: OffersType } = {
    [offers[0].city.name]: [offers[0]] as OffersType,
  };

  offers.forEach((offer, i) => {
    if (i === 0) {
      return;
    }
    if (currentCityName === offer.city.name as CityNames) {
      sectionsObject[currentCityName].push(offer);
    } else {
      currentCityName = offer.city.name;
      sectionsObject[currentCityName] = [];
      sectionsObject[currentCityName].push(offer);
    }
  });

  return sectionsObject as SectionsObject;
};
