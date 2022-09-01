import React, { useEffect } from 'react';
import MainFilterOption from './main-filter-option';


const MainFilter = <T extends string = string>(
  { list, onChange, active, }:
    {
      list: T[],
      active: number | T,
      onChange: (option: T) => void,
    }
) => {

  const isActiveNumber = typeof active === 'number';
  let activeId: number;

  if (isActiveNumber) {
    activeId = active;
  } else {
    activeId = list.indexOf(active);
  }

  const [current, setCurrent] = React.useState<number>(activeId);

  useEffect(() => setCurrent(() => {
    if (isActiveNumber) {
      return active;
    } else {
      return list.indexOf(active);
    }
  }), [active]);

  const onClickOption = (id: number) => {
    setCurrent(id);
    if (isActiveNumber) {
      onChange(list[id]);
    } else {
      onChange(id as unknown as T);
    }
  };
  return (
    <section className='locations container'>
      <ul className='locations__list tabs__list'>
        {
          list.map((option, id) => (
            < MainFilterOption key={option} label={option} isActive={current === id} onClick={() => onClickOption(id)} />
          ))
        }
      </ul>
    </section>
  );
};

export default MainFilter;
