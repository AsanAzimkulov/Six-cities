import { Route, Routes } from 'react-router-dom';
import Login from '../login/login';
import Room from '../room/room';
import Main from '../main/main';
import Favorites from './../favorites/favorites';
import { AppRoute } from '../../types/const';
import PrivateRoute from '../private-route/private-route';
import { Store } from '../../types/store';
import { connect } from 'react-redux';
import { ConnectedProps } from 'react-redux';
import { LoadingVidget } from '../../types/libs/react-loading';
import browserHistory from '../../browser-history';
import { isCheckedAuth } from '../../utils/auth/basic';
import LoadingScreenWithBackground from './../loading-screen/ready/with-background/loading-screen-with-background';
import CustomRouter from '../customs/custom-routes';
import NotFoundPage from './../not-found-page/not-found-page';

const mapStateToProps = ({ authorizationStatus, isDataLoaded }: Store) => ({
  authorizationStatus,
  isDataLoaded,
});

const connector = connect(mapStateToProps);


type PropsFromRedux = ConnectedProps<typeof connector>


function App({ authorizationStatus, isDataLoaded }: PropsFromRedux): JSX.Element {

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreenWithBackground label={'loading...'} color={'#fff'} labelColor={'#9fdfed'} type={LoadingVidget.bars} />
    );
  }

  return (
    <CustomRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Home} element={<Main />} />

        <Route path={AppRoute.Login} element={<Login />} />

        <Route path={AppRoute.Offer} element={<Room />} />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              component={<Favorites />}
            />
          }
        />

        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </CustomRouter>
  );
}

export { App };
export default connector(App);
