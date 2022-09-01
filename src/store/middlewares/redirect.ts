import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import browserHistory from '../../browser-history';
import { RootState } from '../store';

export const redirect: Middleware<unknown, RootState> =
  (store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };

