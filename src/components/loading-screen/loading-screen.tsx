import React from 'react';

import ReactLoading from 'react-loading';
import { LoadingVidget } from '../../types/libs/react-loading';
import styles from './loading-screen.module.css';


export type LoadingScreenProps = {
  label: string,
  color: string,
  type: LoadingVidget,
  labelColor?: string,
  fontSize?: string
}
const LoadingScreen = ({
  label,
  color = '#000',
  type,
  labelColor = color,
  fontSize = '6.5em'
}: LoadingScreenProps): JSX.Element => (
  <div
    className={styles.container}
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '27vw',
      height: '100%',
      justifyContent: 'center',
      margin: 'auto auto',

    }}
  >
    <ReactLoading type={type} color={color} width={'100%'} height={'100%'} />
    <p style={{
      fontSize: fontSize,
      color: labelColor,
      margin: '0'
    }}
    >
      {label}
    </p>

  </div>

);

export default LoadingScreen;
