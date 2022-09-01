import { useEffect, useState } from 'react';

import { SortVariants } from '../../types/sort';
import classNames from 'classnames';

export type SortPropsType = {
  variants: SortVariants[],
  onChange: (option: SortVariants) => void,
  activeId: number
};

const Sort = ({ variants, onChange, activeId }: SortPropsType): JSX.Element => {
  const [activeSortId, setActiveSortId] = useState<number>(activeId);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => setActiveSortId(activeId), [activeId]);

  const onChangeOption = (id: number) => {
    setActiveSortId(id);
    onChange(variants[id]);
    setIsVisible(false);
  };
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0}
        style={{
          marginLeft: 10
        }}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {variants[activeSortId]}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use href='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={
        classNames(
          'places__options', 'places__options--custom',
          { 'places__options--opened': isVisible }
        )
      }
      >
        {
          variants.map((title, id) => (
            <li key={title} className={classNames('places__option', { 'places__option--active': id === activeSortId })} onClick={() => onChangeOption(id)} tabIndex={0}>{title}</li>
          ))
        }

      </ul>
    </form >
  );
};

export default Sort;
