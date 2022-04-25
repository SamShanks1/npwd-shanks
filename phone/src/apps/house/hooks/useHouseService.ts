import { useNuiEvent } from 'fivem-nui-react-lib';
import { useCallback } from 'react';
import { useHouseActions } from './useHouseActions';
import { HouseEvents, addKeyHolder, HouseBroadcastKeyAddDTO, HouseBroadcastHouseAddDTO } from '@typings/house';

export const useHouseService = () => {
  const { giveHouseKey, newHouse } = useHouseActions();

  const giveHouseKeyHandler = useCallback(
    (resp: HouseBroadcastKeyAddDTO) => {
      giveHouseKey(resp.data);
    },
    [giveHouseKey],
  );

  const addNewHouse = useCallback(
    (resp: HouseBroadcastHouseAddDTO) => {
      newHouse(resp.data);
    },
    [newHouse],
  );


  useNuiEvent<HouseBroadcastKeyAddDTO>(
    'HOUSE',
    HouseEvents.ADD_KEY_HOLDER,
    giveHouseKeyHandler,
  );

  useNuiEvent<HouseBroadcastHouseAddDTO>(
    'HOUSE',
    HouseEvents.ADD_HOUSE,
    addNewHouse,
  );


};
