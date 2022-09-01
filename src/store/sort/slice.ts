import { createSlice } from '@reduxjs/toolkit';
import { SortVariants } from '../../types/sort';
import { SortSliceState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';


const initialState: SortSliceState = {
  sort: SortVariants.Popular,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSort(state, action: PayloadAction<SortVariants>) {
      state.sort = action.payload;
    }
  }
});

export const { changeSort } = sortSlice.actions;

export default sortSlice.reducer;
