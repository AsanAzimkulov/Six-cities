import { OffersType, OfferType } from '../../types/offer';
import { SortVariants } from '../../types/sort';


export const sortOptionToOfferField = (method: SortVariants, defaultMethod: SortVariants) => {
  let field;
  switch (method) {
    case defaultMethod:
      field = 'no-field';
      break;
    case SortVariants.PriceAscending:
      field = 'price';
      break;
    case SortVariants.PriceDescending:
      field = '-price';
      break;
    case SortVariants.Rating:
      field = '-rating';
      break;
    default:
      field = 'no-field';
  }
  return field as keyof OfferType & 'no-field' & '-price';
};


export const sortByField = (offerOne: OfferType, offerTwo: OfferType, field: keyof OfferType, asc = true) => {
  const firstOfferField = offerOne[field] as number;
  const secondOfferField = offerTwo[field] as number;
  if (asc) {
    if (firstOfferField > secondOfferField) {
      return 1;
    } else if (firstOfferField < secondOfferField) {
      return -1;
    } else {
      return 0;
    }
  }
  if (firstOfferField < secondOfferField) {
    return 1;
  } else if (firstOfferField > secondOfferField) {
    return -1;
  } else {
    return 0;
  }


};


const deleteDescSymbol = (field: string): keyof OfferType => field.slice(1) as keyof OfferType;
export const sortOffers = (offers: OffersType, method: SortVariants, defaultMethod: SortVariants) => {

  const sortField = sortOptionToOfferField(method, defaultMethod);
  if (sortField === 'no-field') {
    return offers;
  }
  let readyField: keyof OfferType = sortField;
  let ascendingOrder = true;
  if (sortField[0] === '-') {
    readyField = deleteDescSymbol(sortField);
    ascendingOrder = false;
  }


  return offers.sort((offerOne, offerTwo) => sortByField(offerOne, offerTwo, readyField, ascendingOrder));

};
