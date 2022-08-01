import React from 'react';
import { useState, useRef } from 'react';
import { OffersList } from '../offers-list/offers-list';
import { SortVariants } from '../../types/sort';
import { Dispatch } from 'redux';
import { CityNames, CityType, PointType } from '../../types/location';
import Map from '../map/map';
import Sort from './../sort/sort';
import { Store } from '../../types/store';
import { connect, ConnectedProps } from 'react-redux';
import generatePoints from './../../utils/map/generatePoints';
import { OfferType } from '../../types/offer';
import { changeCity, changeSort } from './../../store/actions/action';
import { Actions } from '../../types/action';
import MainFilter from '../lib/common-text/filter/main-filter/main-filter';
import { sortOffers } from '../../utils/offers/sortOffers';
import { ServerConfig } from '../../services/const';
import Header from '../layout/header/header';

const mapStateToProps = ({ offers, city, sort }: Store) => ({
  offers,
  city,
  sort
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeCity(city: CityType) {
    dispatch(changeCity(city));
  },
  onChangeSort(sort: SortVariants) {
    dispatch(changeSort(sort));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

const Main = ({ offers, city, onChangeCity, sort, onChangeSort }: PropsFromRedux): JSX.Element => {
  const filteredOffers = React.useMemo(() => offers.filter((offer) => offer.city.name === city.name), [city]);
  const sortedOffers = sortOffers(filteredOffers, sort, ServerConfig.sorting);

  const mapContainerRef = useRef<HTMLElement | null>(null);

  const [selectedPoint, setSelectedPoint] = useState<PointType | undefined>(
    undefined
  );
  const onOfferHover = (id: number): void => {
    const currentOffer = offers.find((offer) => id === offer.id);
    if (currentOffer) {
      const currentPoint = { ...currentOffer.location, id: currentOffer.id };
      setSelectedPoint(currentPoint);
    }
  };
  const points = React.useMemo(() => generatePoints(filteredOffers), [filteredOffers]);
  const onChangeCityFilter = (cityName:
    CityNames) => {
    if (city.name === cityName) {
      return;
    }
    const offerWithSameCity = offers.find((offer: OfferType) => offer.city.name === cityName) as OfferType;
    onChangeCity(offerWithSameCity.city);
  };
  const onChangeOffersSort = (option: SortVariants) => {
    if (option === sort) {
      return;
    }
    onChangeSort(option);
  };

  const filterOptions = Object.values(CityNames) as unknown as [CityNames];
  const offersSortVariants = Object.values(SortVariants) as SortVariants[];
  return (
    <div className='page page--gray page--main'>
      <Header />
      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <div className='tabs'>
          <MainFilter list={filterOptions} onChange={onChangeCityFilter} initial={0} />
        </div>
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{filteredOffers.length} places to stay in Amsterdam</b>
              <Sort variants={offersSortVariants}
                onChange={onChangeOffersSort}
              />
              <div className='cities__places-list places__list tabs__content'>
                <OffersList offers={sortedOffers} onOfferHover={onOfferHover} />
              </div>
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map' ref={mapContainerRef}>
                <Map
                  points={points}
                  selectedPoint={selectedPoint}
                  city={city}
                  containerRef={mapContainerRef}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connector(Main);
export { Main };
