import React, { useEffect } from 'react';
import BackgroundFullscreen from '../../../lib/common-text/background/background-fullscreen';
import LoadingScreen, { LoadingScreenProps } from '../../loading-screen';

const LoadingScreenWithBackground = (props: LoadingScreenProps) => {
  const [resolution, setResolution] = React.useState({
    isMobileResolution: window.matchMedia('(max-width: 767px)').matches,
    isHighResolution: window.matchMedia('(min-width: 2200px)').matches,
  });

  useEffect(() => {
    const mobileResolutionHandler = (e: MediaQueryListEvent) => setResolution((prev) => ({ ...prev, isMobileResolution: e.matches }));
    const mobileResMediaQuery = window.matchMedia('(max-width: 767px)');
    mobileResMediaQuery.addEventListener('change', mobileResolutionHandler);

    const highResolutionHandler = (e: MediaQueryListEvent) => setResolution((prev) => ({ ...prev, isHighResolution: e.matches }));
    const highResMediaQuery = window.matchMedia('(min-width: 2200px)');
    highResMediaQuery.addEventListener('change', highResolutionHandler);

    return () => {
      mobileResMediaQuery.removeEventListener('change', mobileResolutionHandler);
      highResMediaQuery.removeEventListener('change', highResolutionHandler);
    };
  }, []);
  let labelFontSize;
  switch (true) {
    case resolution.isMobileResolution:
      labelFontSize = '3.5em';
      break;
    case resolution.isHighResolution:
      labelFontSize = '10em';
      break;
    default:
      labelFontSize = '6.5em';
  }

  return (
    <BackgroundFullscreen styles={{
      backgroundColor: 'rgb(255,255,255)',
      background: 'linear-gradient(211deg, rgba(255,255,255,1) 0%, rgba(42,146,200,1) 38%, rgba(36,216,226,1) 100%)',
    }}
    >
      <div style={{
        position: 'absolute',
        width: '100%',
        marginTop: resolution.isMobileResolution ?
          '30vh'
          :
          '5vh',


      }}
      >
        <LoadingScreen {...props} fontSize={labelFontSize} />
      </div>
    </BackgroundFullscreen>
  );
};
export default LoadingScreenWithBackground;
