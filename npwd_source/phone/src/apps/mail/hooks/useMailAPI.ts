import { useCallback } from 'react';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useNuiEvent } from 'fivem-nui-react-lib';

import { MailEvents, mailInt, MailBroadcastAddDTO, updateMailButtonInt, buttonInt } from '@typings/mail';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { useMailActions } from './useMailActions';
import { DeleteMailDTO } from '@typings/mail';

interface MailAPIValue {
  deleteMail: (id: DeleteMailDTO) => Promise<void>;
  updateRead: (id: DeleteMailDTO) => Promise<void>;
  updateMailButton: (data: updateMailButtonInt) => Promise<void>;
}

export const useMailAPI = (): MailAPIValue => {
  const { addAlert } = useSnackbar();
  const { deleteLocalMail, updateReadState, updateButtonState, addMail } = useMailActions();

  const updateRead = useCallback(
    async (mailid: DeleteMailDTO) => {
      const resp = await fetchNui<ServerPromiseResp<DeleteMailDTO>>(MailEvents.UPDATE_MAIL_READ, mailid);
      updateReadState(resp.data.id);
    },
    [updateReadState],
  );


  const updateMailButton = useCallback(
    async ({ mailid, button }: updateMailButtonInt) => {
      const resp = await fetchNui<ServerPromiseResp>(MailEvents.UPDATE_MAIL_BUTTON, {
        mailid,
        button,
      });
      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Failed to accept mail',
          type: 'error',
        });
      }
      updateButtonState(mailid);

      addAlert({
        message: 'Successfully accepted mail',
        type: 'success',
      });
    },
    [addAlert, updateButtonState],
  );

  const deleteMail = useCallback(
    async (mail: DeleteMailDTO) => {
      const resp = await fetchNui<ServerPromiseResp<DeleteMailDTO>>(MailEvents.DELETE_MAIL, mail);

      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Failed to delete mail',
          type: 'error',
        });
      }

      deleteLocalMail(resp.data.id);

      addAlert({
        message: 'Successfully deleted mail',
        type: 'success',
      });
    },
    [addAlert, deleteLocalMail],
  );



  return { deleteMail, updateRead, updateMailButton };
};
