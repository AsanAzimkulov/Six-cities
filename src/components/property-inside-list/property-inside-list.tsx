import React from 'react';

import newId from './../../utils/id/newId';

type PropertyInsideListPropsType = {
  list: string[]
}

const PropertyInsideList = ({list}:PropertyInsideListPropsType) =>
  (
    <ul className='property__inside-list'>
      {
        list.map((propertyInsideTitle, index) => <li className='property__inside-item' key = {newId()}>{propertyInsideTitle}</li>)
      }
    </ul>
  );


export default PropertyInsideList;
