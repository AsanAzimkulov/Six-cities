import { PointsType } from '../../types/location';
import { OffersType } from '../../types/offer';


const generatePoints = (offers: OffersType) => offers.map((offer) => ({
  ...offer.location,
  id: offer.id
})) as unknown as PointsType;

export default generatePoints;
