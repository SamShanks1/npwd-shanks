import React, { memo, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../../../../ui/components/Modal';
import { useModal } from '../../hooks/useModal';
import { usePhone } from '@os/phone/hooks/usePhone';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useTranslation } from 'react-i18next';
import { promiseTimeout } from '../../../../utils/promiseTimeout';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { toggleKeys } from '../../../../ui/components/Input';
import { Box, Divider, styled } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Paper } from '@mui/material';
import { useSelectedHouse } from '../../hooks/state';

const useStyles = makeStyles({
  root: {
    zIndex: 10,
    marginTop: '15px',
    width: '75%',
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'absolute',
    top: '80px',
    borderRadius: '5px',
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

const AddHouseModal = () => {
  const { modalVisible, setModalVisible } = useModal();
  const [selectedHouse, setselectedHouse] = useSelectedHouse();

  const reset = () => {
    setselectedHouse(null);
  };

  const handleClose = () => {
    reset();
    setModalVisible(false);
  };

  const classes = useStyles();

  const showHideClassName = modalVisible ? classes.displayBlock : classes.displayNone;

  if (selectedHouse === null) return null;


  return (
    <div className={showHideClassName}>
      <Paper className={classes.root}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', color: '#dedede' }}
        >
          {selectedHouse.label}
        </Box>
        <Divider sx={{ padding: '8px' }} />
        <Box
          sx={{
            marginY: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Button variant="outlined" size="large" sx={{ width: '150px', height: '45px' }}>
            Transfer
          </Button>
          <Button variant="outlined" size="large" sx={{ width: '150px', height: '45px' }}>
            Keys
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            color="error"
            size="large"
            sx={{ width: '150px', height: '45px', marginTop: '25px' }}
          >
            Close
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default memo(AddHouseModal);
