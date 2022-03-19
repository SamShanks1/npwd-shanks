import { useSetMail } from './state';
import { useCallback } from 'react';
import { mailInt } from '@typings/mail';

interface UseMailActionsValue {
  deleteLocalMail: (id: number) => void;
  updateButtonState: (id: number) => void;
  updateReadState: (id: number) => void;
  addMail: (mail: mailInt) => void;
}

export const useMailActions = (): UseMailActionsValue => {
  const setMail = useSetMail();

  const updateReadState = useCallback(
    (id) => {
      setMail((curMail) => {
        const targetIndex = curMail.findIndex((storedMail) => storedMail.mailid === id);
        const newMailArray = [...curMail];
        newMailArray[targetIndex].read = 1;
        return newMailArray;
      });
    },
    [setMail],
  )

  const deleteLocalMail = useCallback(
    (id) => {
      setMail((curMail) => [...curMail].filter((mail) => mail.mailid !== id));
    },
    [setMail],
  );

  const updateButtonState = useCallback(
    (id) => {
      setMail((curMail) => {
        const targetIndex = curMail.findIndex((storedMail) => storedMail.mailid === id);
        const newMailArray = [...curMail];
        newMailArray[targetIndex].button = null;
        return newMailArray;
      });
    },
    [setMail],
  );

  const addMail = useCallback(
    (mail: mailInt) => {
      setMail((currMail) => [mail, ...currMail]);
    },
    [setMail],
  );

  return { deleteLocalMail, updateButtonState, updateReadState, addMail };
};
