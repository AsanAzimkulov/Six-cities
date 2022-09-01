import { redirect } from './middlewares/redirect';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import data from './data/slice';
import user from './user/slice';
import sort from './sort/slice';
import filter from './filter/slice';
import { AxiosInstance } from 'axios';

export const rootReducer = combineReducers({
  data,
  user,
  sort,
  filter
});


export const setupStore = (api: AxiosInstance) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
      .concat(redirect)
});


export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
