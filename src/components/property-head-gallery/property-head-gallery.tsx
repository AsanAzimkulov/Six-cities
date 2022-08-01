import React from 'react';
import newId from '../../utils/id/newId';

type PropertyHeadGalleryProps = {
  images: string[];
};
const PropertyHeadGallery = ({ images }: PropertyHeadGalleryProps) => {
  const imagesToRender = images.slice(0, 6);
  return (
    <div className='property__gallery-container container'>
      <div className='property__gallery'>
        {imagesToRender.map((imageUrl) => (
          <div className='property__image-wrapper' key = {newId()}>
            <img
              className='property__image'
              src={imageUrl}
              alt='Photo studio'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyHeadGallery;
