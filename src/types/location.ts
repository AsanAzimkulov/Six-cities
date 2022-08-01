export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type CityType = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  name: CityNames,
};

export type PointType = {
  id: number,
  latitude: number,
  longitude: number,
  zoom: number
};

export type PointsType = Array<PointType>;
