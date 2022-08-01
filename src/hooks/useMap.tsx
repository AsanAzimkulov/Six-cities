import { useEffect, useState, MutableRefObject } from 'react';
import L, { Map, TileLayer } from 'leaflet';
import { CityType } from '../types/location';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    setMap(null);
    return () => {
      const container = L.DomUtil.get('map') as HTMLElement & { // фикс ошибки: map already been initialized
        _leaflet_id: number | null;
      };
      if (container !== null) {
        /* eslint-disable */
        container._leaflet_id = null;
      }
    }
  }, [city]); // обновление карты при смене города
  let instance: Map;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: false,
        dragging: true,
      });
      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );
      instance.addLayer(layer);
      setMap(instance);
    }

  }, [mapRef, map, city]);


  return map;
}

export default useMap;
