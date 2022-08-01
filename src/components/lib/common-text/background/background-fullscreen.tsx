import React from 'react';

type BackgroundFullscreenProps = {
  zIndex?: number,
  styles: object,
  children?: JSX.Element
}

const BackgroundFullscreen: React.FC<BackgroundFullscreenProps> = (props) => {
  const { styles, children, zIndex } = props;
  return (
    <>
      <div
        style={{
          zIndex: zIndex || -9999,
          position: 'absolute',
          height: '100%',
          width: '100%',
          ...styles
        }}

      >
      </div>
      {children}
    </>
  );
};
export default BackgroundFullscreen;
