import React, { useEffect } from 'react';
import qs from 'qs';
import { useState, useRef } from 'react';
import { OffersList } from '../offers-list/offers-list';
import { SortVariants, SortVariantsBuffer } from '../../types/sort';
import { CityNames, CityType, PointType } from '../../types/location';
import Map from '../map/map';
import Sort from './../sort/sort';
import generatePoints from './../../utils/map/generatePoints';
import { OfferType } from '../../../../offer';
import { changeCity } from '../../store/filter/slice';
import { changeSort } from '../../store/sort/slice';
import MainFilter from '../lib/common-text/filter/main-filter/main-filter';
import { sortOffers } from '../../utils/offers/sortOffers';
import { ServerConfig } from '../../services/const';
import Header from '../layout/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectData } from '../../store/data/selectors';
import { selectFilter } from '../../store/filter/selectors';
import { selectSort } from '../../store/sort/selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../types/const';


const Main = (): JSX.Element => {
  const isMounted = useRef<boolean>(false);
  const dispatch = useAppDispatch();

  const onChangeCity = (city: CityType) => {
    dispatch(changeCity(city));
  };

  const onChangeSort = (sort: SortVariants) => {
    dispatch(changeSort(sort));
  };

  const { offers } = useAppSelector(selectData);
  const { city } = useAppSelector(selectFilter);
  const { sort } = useAppSelector(selectSort);

  const filteredOffers = React.useMemo(() => offers.filter((offer) => offer.city.name === city.name), [city]);
  const sortedOffers = sortOffers(filteredOffers, sort, ServerConfig.sorting);

  const navigate = useNavigate();


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      if (params.sort && params.city) {
        const paramsCity = params.city as unknown as CityType;
        const qsSort = params.sort as unknown as SortVariants;
        const paramsSort = SortVariantsBuffer[qsSort] as unknown as SortVariants;
        console.log(paramsSort, paramsCity);
        dispatch(changeSort(paramsSort));
        dispatch(changeCity(paramsCity));
      } else {
        navigate(AppRoute.Home);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: SortVariantsBuffer[sort],
        city
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [city, sort]);


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
    string) => {
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
          <MainFilter list={filterOptions} onChange={onChangeCityFilter} active={filterOptions.indexOf(city.name)} />
        </div>
        {
          offers.length === 0 ?
            <div className='cities page__main--index-empty'>
              <div className='cities__places-container cities__places-container--empty container'>
                <section className='cities__no-places'>
                  <div className='cities__status-wrapper tabs__content'>
                    <b className='cities__status'>No places to stay available</b>
                    <p className='cities__status-description'>We could not find any property available at the moment in Dusseldorf</p>
                  </div>
                </section>
                <div className='cities__right-section'></div>
              </div>
            </div>
            :
            <div className='cities'>
              <div className='cities__places-container container'>
                <section className='cities__places places'>
                  <h2 className='visually-hidden'>Places</h2>
                  <b className='places__found'>{filteredOffers.length} places to stay in {city.name}</b>
                  <Sort variants={offersSortVariants}
                    onChange={onChangeOffersSort}
                    activeId={Object.values(SortVariants).indexOf(sort)}
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
        }
      </main>
    </div>
  );
};

export default Main;

