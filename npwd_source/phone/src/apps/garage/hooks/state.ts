import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { buildRespObj } from '@utils/misc';
import { VehicleInterface, GarageEvents } from '@typings/garage';
import { isEnvBrowser } from '@utils/misc';

const defaultVehicleData: VehicleInterface[] = [
  {
    id: 1,
    vehicle: 'Mercedes AMG GT63',
    plate: 'PLA 5423',
    state: 1,
    garage: 'Alta Garage',
    engine: 99,
    fuel: 60,
    body: 96,
  },
  {
    id: 2,
    vehicle: 'Truffade Adder',
    plate: 'PFA 6233',
    state: 0,
    garage: 'Alta Garage',
    engine: 99,
    fuel: 60,
    body: 96,
  },
  {
    id: 3,
    vehicle: 'Grotti Turismo',
    plate: 'FAD 5234',
    state: 2,
    garage: 'Alta Garage',
    engine: 99,
    fuel: 60,
    body: 96,
  },
]; 
export const vehicleState ={
  garageVehicles: atom<VehicleInterface[]>({
  key: 'vehicles',
  default: selector({
    key: 'defaultVehicles',
    get: async () => {
      try {
        const resp = await fetchNui<ServerPromiseResp<VehicleInterface[]>>(
          GarageEvents.FETCH_VEHICLES,
        );
        return resp.data;
      } catch (e) {
        if (isEnvBrowser()) {
          return defaultVehicleData
        };
        console.error(e);
        return [];
      }
    },
  }),
}),
filterValue: atom<string>({
  key: 'defaultFilterValueGarage',
  default: '',
}),
filteredGarageVehicles: selector<VehicleInterface[]>({
  key: 'defaultFilteredVehicles',
  get: ({ get }) => {
    const searchValue: string = get(vehicleState.filterValue);
    const garageVehicles: VehicleInterface[] = get(vehicleState.garageVehicles);

    if (!searchValue) return garageVehicles; // added this

    const regExp = new RegExp(searchValue, 'gi');

    return garageVehicles.filter(
      (vehicle) =>
      vehicle?.plate?.match(regExp) || vehicle?.vehicle?.match(regExp),
    );
  },
}),
};




export const useGarageValue = () => useRecoilValue(vehicleState.garageVehicles);
export const useFilterValueState = () => useRecoilState(vehicleState.filterValue);
export const useFilteredGarageValue = () => useRecoilValue(vehicleState.filteredGarageVehicles);
export const useSetGarage = () => useSetRecoilState(vehicleState.garageVehicles);


