export interface houseBaseInt {
  id: number;
  house: string;
  keyholders: string[];
}

export enum HouseEvents {
  FETCH_HOUSES = 'npwd:fetchAllHouses',
}

export interface houseLocationInt {
  label: string;
  coords: {
    enter: {
      h: number;
      x: number;
      y: number;
      z: number;
    },
    cam: {
      h: number;
      yaw: number;
      x: number;
      y: number;
      z: number;
    }
  };
  tier: number;
  garage: {
    h: number;
    x: number;
    y: number;
    z: number;
  }
}

export interface PropertiesInt extends houseBaseInt, houseLocationInt { };


  