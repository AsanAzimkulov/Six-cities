import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../types/const';
import { selectUser } from '../../store/user/selectors';
import LoadingScreenWithBackground from '../loading-screen/ready/with-background/loading-screen-with-background';
import { LoadingVidget } from '../../types/libs/react-loading';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
const MAX_LOADING_WAITING_TIME = 6000;

type TPrivateRouteProps = {
  component: JSX.Element
}

const PrivateRoute = ({ component}: TPrivateRouteProps): JSX.Element => {
  const {authorizationStatus} = useAppSelector(selectUser);
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


export default PrivateRoute;

