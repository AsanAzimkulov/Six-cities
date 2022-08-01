import React from'react';

import CommonText from '../lib/common-text/common-text';

type PropertyDescriptionProps = {
  text: string;
};

const PropertyDescription = ({ text }: PropertyDescriptionProps) =>
  (
    <div className="property__description">
      <CommonText text={text} />
    </div>
  );

export default PropertyDescription;
