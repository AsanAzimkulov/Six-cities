import React from'react';
type CommonTextProps = {
  text: string;
};
const CommonText = ({ text }: CommonTextProps) => (
  <p className="property__text">{text}</p>
);


export default CommonText;
