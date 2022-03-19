import { useNuiEvent } from 'fivem-nui-react-lib';
import { useCallback } from 'react';
import { useMailNotifications } from './useMailNotifications';
import { useMailActions } from './useMailActions';
import { MailEvents, MailBroadcastAddDTO, } from '@typings/mail';

export const useMailService = () => {
  const { deleteLocalMail, updateReadState, updateButtonState, addMail } = useMailActions();
  const { setNotification } = useMailNotifications();



  const addMailHandler = useCallback(
    (resp: MailBroadcastAddDTO) => {
      addMail(resp.mail);
      setNotification(resp.mail);
    },
    [addMail, setNotification],
  );


  useNuiEvent<MailBroadcastAddDTO>(
    'MAIL',
    MailEvents.BROADCAST_ADD,
    addMailHandler,
  );

};
