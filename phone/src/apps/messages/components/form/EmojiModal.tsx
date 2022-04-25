import React, { memo, useCallback, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import data from 'emoji-mart/data/google.json';

import { NimblePicker } from 'emoji-mart';
import { useTheme } from '@mui/material';
import {
  useSetEmojiModal,
  messageState,
  useEmojiModalValue,
  useSetTextMessage,
  useTextMessageValue,
  useSelectedMessageValue,
} from '../../hooks/state';
const useStyles = makeStyles({
  root: {
    zIndex: 10,
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'absolute',
    top: '250px',
    width: '99%',
  },
  displayBlock: {
    /*Sets modal to center*/
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  displayNone: {
    display: 'none',
  },
});

const AddEmojiModal = () => {
  const classes = useStyles();
  const theme = useTheme();
  const message = useTextMessageValue();
  const setMessage = useSetTextMessage();
  const modalVisible = useEmojiModalValue();

  if (!modalVisible) return null;

  const handleSelectEmoji = (emojiObject, e) => {
    setMessage(message.concat(emojiObject.native));
  };

  const showHideClassName = modalVisible ? classes.displayBlock : classes.displayNone;
  return (
    <div className={showHideClassName}>
      <div className={classes.root}>
        <NimblePicker
          className={classes.root}
          data={data}
          onClick={handleSelectEmoji}
          set="google"
          theme={theme.palette.mode}
          showPreview={false}
        />
      </div>
    </div>
  );
};

export default memo(AddEmojiModal);
