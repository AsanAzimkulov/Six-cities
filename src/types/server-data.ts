import { CityType } from './location';
import {Token} from '../services/token';

type serverDataUserType = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
  email?: string,
  token?: Token,
}

export type serverDataOfferType = {
  id: number,
  bedrooms: number,
  city: CityType,
  description: string,
  goods: string[],
  host: serverDataUserType,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type serverDataAuthInfoType = {
  avatar_url: string,
  email: string,
  id: number,
  is_pro: boolean,
  name: string,
  token: Token,
}

export type serverDataReviewType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatar_url: string,
    id: number,
    is_pro: boolean,
    name: string,
  }
}

export type serverDataReviewsType = Array<serverDataReviewType>

export type serverDataOffersType = serverDataOfferType[];
