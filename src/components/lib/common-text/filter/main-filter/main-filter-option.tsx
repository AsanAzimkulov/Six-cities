import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type MainFilterOptionProps = {
  onClick: () => void
  label: string,
  isActive: boolean
}

const MainFilterOption = ({ label, isActive, onClick }: MainFilterOptionProps) => (
  <li className='locations__item'
    onClick={() => onClick()}
  >
    <Link className={
      classNames({
        'locations__item-link': true,
        'tabs__item': true,
        'tabs__item--active': isActive
      })
    }
    to = {`?city=${label}`}
    >
      <span>{label}</span>
    </Link>
  </li >
);

export default MainFilterOption;
