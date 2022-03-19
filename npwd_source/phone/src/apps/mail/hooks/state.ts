import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { MailEvents } from '@typings/mail';
import { mailInt } from '@typings/mail';
import LogDebugEvent from '../../../os/debug/LogDebugEvents';
import { isEnvBrowser } from '../../../utils/misc';
import { BrowserMailData } from '../utils/constants';


export const mailStates = {
  mailItems: atom({
    key: 'mailItem',
    default: selector<mailInt[]>({
      key: 'defaultMailItems',
      get: async () => {
        try {
          const resp = await fetchNui<ServerPromiseResp<mailInt[]>>(
            MailEvents.FETCH_ALL_MAIL,
          );
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return BrowserMailData;
          }
          console.error(e);
          return [];
        }
      },
    }),
  }),
  selectedMail: atom<Partial<mailInt> | null>({
    key: 'selectedMail',
    default: null,
  }),
  modalVisibile: atom({
    key: 'mailModalVisible',
    default: false,
  }),
};

export const useSetSelectedMail = () => useSetRecoilState(mailStates.selectedMail);
export const useSelectedMail = () => useRecoilState(mailStates.selectedMail);

export const useSetModalVisible = () => useSetRecoilState(mailStates.modalVisibile);
export const useModalVisible = () => useRecoilState(mailStates.modalVisibile);

export const useMailsValue = () => useRecoilValue(mailStates.mailItems);
export const useSetMail = () => useSetRecoilState(mailStates.mailItems);
