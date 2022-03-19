import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { MailEvents } from '@typings/mail';
import { PropertiesInt } from '@typings/house';
import LogDebugEvent from '../../../os/debug/LogDebugEvents';
import { isEnvBrowser } from '../../../utils/misc';
import { houseData } from '../utils/constants';


export const houseStates = {
    houseItems: atom({
        key: 'houseitem',
        default: selector<PropertiesInt[]>({
            key: 'defaultHouseItem',
            get: async () => {
                try {
                    const resp = await fetchNui<ServerPromiseResp<PropertiesInt[]>>(
                        MailEvents.FETCH_ALL_MAIL,
                    );
                    return resp.data;
                } catch (e) {
                    if (isEnvBrowser()) {
                        return houseData;
                    }
                    console.error(e);
                    return [];
                }
            },
        }),
    }),
    selectedHouse: atom<Partial<PropertiesInt> | null>({
        key: 'selectedHouse',
        default: null,
    }),
    houseListModal: atom({
        key: 'houseListModal',
        default: false,
    }),
};

export const useSetSelectedHouse = () => useSetRecoilState(houseStates.selectedHouse);
export const useSelectedHouse = () => useRecoilState(houseStates.selectedHouse);

export const useHouseValue = () => useRecoilValue(houseStates.houseItems);
