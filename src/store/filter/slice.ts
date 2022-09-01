import { createSlice } from '@reduxjs/toolkit';
import { Paris } from '../../mocks/city';
import { FilterSliceState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';
import { CityType } from '../../types/location';

const initialState: FilterSliceState = {
  city: Paris,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityType>) {
      state.city = action.payload;
    },
  }
});

export const { changeCity } = filterSlice.actions;

export default filterSlice.reducer;
