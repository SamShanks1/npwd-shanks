import { useSetGarage } from './state';
import { useCallback } from 'react';
import { NoteItem } from '@typings/notes';
import { VehicleInterface } from '@typings/garage';


interface UseGarageActionsValue {
  addLocalVeh: (veh: VehicleInterface[]) => void;
}

export const useGarageActions = (): UseGarageActionsValue => {
  const setVehicles = useSetGarage();

  const addLocalVeh = useCallback(
    (veh: VehicleInterface[]) => {
      setVehicles(veh)
    },
    [setVehicles],
  );


  return { addLocalVeh };
};
