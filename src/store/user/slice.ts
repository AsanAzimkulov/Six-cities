import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/const';
import { UserSliceState } from './types';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthInfoType } from '../../types/authInfo';

const initialState: UserSliceState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthInfoType | null>) {
      state.user = action.payload;
    },
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    requireLogout(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }
  },
});


export default userSlice.reducer;

export const { setUser, requireAuthorization, requireLogout } = userSlice.actions;
