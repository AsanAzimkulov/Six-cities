import React from 'react';
import { createRoot } from 'react-dom/client';

import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThunkAppDispatch } from './types/action';

import { reducer } from './store/reducers/reducer';

import App from './components/app/app';

import { requireAuthorization } from './store/actions/action';
import { AuthorizationStatus } from './types/const';
import { checkAuthAction, fetchOffersAction } from './store/actions/api-actions';
import { redirect } from './store/middlewares/redirect';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth))
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);


(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

const root = createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
