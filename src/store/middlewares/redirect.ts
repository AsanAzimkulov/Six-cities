import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import { reducer } from '../reducers/reducer';
import browserHistory from './../../browser-history';

type RootState = ReturnType<typeof reducer>

export const redirect: Middleware<unknown, RootState> =
  (store) =>
    (next) =>
      (action) => {
        switch (action.type) {
          case ActionType.RedirectToRoute:
            browserHistory.push(action.payload);
        }

        return next(action);
      };
