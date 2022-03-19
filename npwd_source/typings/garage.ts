export interface vehicleList {
    vehicle: string;
    plate: string;
    status: string;
    location: string;
    engine: number;
    fuel: number;
    body: number;
  }


  export enum GarageEvents {
    TRACK_VEHICLE = 'npwd:trackVehicle',
    FETCH_VEHICLES = 'npwd:fetchAllVehicles',
  }
  
  export interface VehicleInterface {
    id: number;
    vehicle: string;
    plate: string;
    state: number;
    garage: string;
    engine: number;
    fuel: number;
    body: number;
  }

  export interface VehicleTrackInt {
    plate: string;
  }