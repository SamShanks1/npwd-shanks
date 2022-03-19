import { useCallback } from 'react';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useGarageActions } from './useGarageActions';
import { VehicleInterface, GarageEvents } from '@typings/garage';


interface GarageAPIValue {
    addNewVehicles: () => Promise<void>;
}

export const useGarageAPI = (): GarageAPIValue => {
  const { addLocalVeh } = useGarageActions();

  const addNewVehicles = useCallback(
    async () => {
      const resp = await fetchNui<ServerPromiseResp<VehicleInterface[]>>(GarageEvents.FETCH_VEHICLES, {});
      addLocalVeh(resp.data)
    },
    [addLocalVeh],
  );


  return { addNewVehicles };
};
