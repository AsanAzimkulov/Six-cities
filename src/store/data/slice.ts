import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersType, OfferType } from '../../../../offer';
import { ReviewsType } from '../../types/reviews';
import { DataSliceState } from './types';

const initialState: DataSliceState = {
  offers: [],
  favoriteOffers: [],
  nearOffers: [],
  offer: null,
  reviews: [],
  isDataLoaded: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setIsDataLoaded(state, action: PayloadAction<boolean>) {
      state.isDataLoaded = action.payload;
    },
    loadOffers(state, action: PayloadAction<OffersType | []>) {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadFavoriteOffers(state, action: PayloadAction<OffersType | []>) {
      state.favoriteOffers = action.payload;
    },
    loadNearOffers(state, action: PayloadAction<OffersType | []>) {
      state.nearOffers = action.payload;
    },
    loadOffer(state, action: PayloadAction<OfferType | null>) {
      state.offer = action.payload;
    },
    loadReviews(state, action: PayloadAction<ReviewsType | []>) {
      state.reviews = action.payload;
    },
  }
});

export const { setIsDataLoaded, loadOffer, loadOffers, loadFavoriteOffers, loadNearOffers, loadReviews } = dataSlice.actions;

export default dataSlice.reducer;
