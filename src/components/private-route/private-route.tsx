import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { Store } from '../../types/store';
import { connect } from 'react-redux';
import LoadingScreenWithBackground from '../loading-screen/ready/with-background/loading-screen-with-background';
import { LoadingVidget } from '../../types/libs/react-loading';
import { useState } from 'react';
const MAX_LOADING_WAITING_TIME = 6000;

const mapStateToProps = ({ authorizationStatus }: Store) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);


const PrivateRoute = ({ component, authorizationStatus }: { component: JSX.Element, authorizationStatus: AuthorizationStatus }): JSX.Element => {
  const [, setIsLogintimeExceeded] = useState(false);
  let element = authorizationStatus === AuthorizationStatus.Auth ? component : <Navigate to={AppRoute.Login} />;
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    element = <LoadingScreenWithBackground label={'loading...'} color={'#fff'} labelColor={'#9fdfed'} type={LoadingVidget.bars} />;
  }
  setTimeout(() => {
    element = authorizationStatus === AuthorizationStatus.Auth ? component : <Navigate to={AppRoute.Login} />;
    setIsLogintimeExceeded(true);
  }, MAX_LOADING_WAITING_TIME);
  return element;
};


export { PrivateRoute };
export default connector(PrivateRoute);

