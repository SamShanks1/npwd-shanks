import { useNuiEvent } from 'fivem-nui-react-lib';
import { useCallback } from 'react';
import { useHouseActions } from './useHouseActions';
import { HouseEvents, addKeyHolder, HouseBroadcastAddDTO } from '@typings/house';

import { MailEvents, MailBroadcastAddDTO, } from '@typings/mail';

export const useHouseService = () => {
  const { giveHouseKey } = useHouseActions();

  const giveHouseKeyHandler = useCallback(
    (resp: HouseBroadcastAddDTO) => {
        giveHouseKey(resp.data);
    },
    [giveHouseKey],
  );

  useNuiEvent<HouseBroadcastAddDTO>(
    'HOUSE',
    HouseEvents.ADD_KEY_HOLDER,
    giveHouseKeyHandler,
  );

};
