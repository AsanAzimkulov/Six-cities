import React, { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { CityType, PointsType, PointType } from '../../types/location';
import { AppRoute } from '../../types/const';
import { useNavigate } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

const [URL_MARKER_DEFAULT, URL_MARKER_CURRENT] = [
  './img/pin.svg',
  './img/pin-active.svg',
];

type MapProps = {
  points: PointsType;
  city: CityType;
  selectedPoint: PointType | undefined;
  containerRef?: { current: null | HTMLElement };
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map =
  ({ points, city, selectedPoint, containerRef }: MapProps): JSX.Element => {
    const mapRef = useRef(null);
    const map = useMap(mapRef, city);
    const navigate = useNavigate();

    useEffect(() => {

      if (map) {

        points.forEach((point) => {
          const marker = new Marker({
            lat: point.latitude,
            lng: point.longitude,
          });

          marker.on('click', () => navigate(generatePath(AppRoute.Offer, { id: point.id.toString() })));

          marker
            .setIcon(
              selectedPoint !== undefined && point.id === selectedPoint.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(map);
        });
      }
      return () => {
        if (containerRef && containerRef.current) {
          containerRef.current.style.backgroundImage = 'none'; //When zooming out a map
        }
      };
    }, [map, points, selectedPoint, city]);
    return <div style={{ height: '100%' }} ref={mapRef} id='map'></div>;
  };


export default Map;
