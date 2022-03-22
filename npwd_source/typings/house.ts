interface keyHold {
  keyholders: {
    name: string;
    citizenid: string;
  }
}

export interface houseBaseInt {
  id: number;
  house: string;
  keyholders: [{
    name: string;
    citizenid: string;
  }];
}

export interface houseBeforeInt {
  id: number;
  house: string;
  keyholders: any;
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

export interface BeforePropertiesInt extends houseBeforeInt, houseLocationInt { };


export interface testInt extends houseLocationInt {
  id: number;
  house: string;
  keyholders: [{
    name: string;
    citizenid: string;
  }];
}
