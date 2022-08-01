import React from 'react';
import MainFilterOption from './main-filter-option';


const MainFilter = <T extends string = string>(
  { list, onChange, initial,}:
  {
    list: T[],
    initial: number | T,
    onChange: (option: T) => void,
  }
) => {
  const isInitialNumber = typeof initial === 'number';
  let initialId: number;

  if (isInitialNumber) {
    initialId = initial;
  } else {
    initialId = list.indexOf(initial);
  }

  const [current, setCurrent] = React.useState<number>(initialId);
  const onClickOption = (id: number) => {
    setCurrent(id);
    if(isInitialNumber){
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
            <MainFilterOption key = {option} label = {option} isActive={current === id} onClick= {() => onClickOption(id)}/>
          ))
        }
      </ul>
    </section>
  );
};

export default MainFilter;
