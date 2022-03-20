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
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  styled,
  TextField,
  Typography,
} from '@mui/material';
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
    minHeight: '250px',
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '0.1em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#0d0d0d',
    },
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
  const [pageType, setPageType] = useState('home');
  const [transferID, setTransferID] = useState('');
  const reset = () => {
    setselectedHouse(null);
    setPageType('home');
    setTransferID('');
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
        {pageType === 'home' && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                color: '#dedede',
              }}
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
              <Button
                variant="outlined"
                onClick={() => {
                  setPageType('transfer');
                }}
                size="large"
                sx={{ width: '150px', height: '45px' }}
              >
                Transfer
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setPageType('keys');
                }}
                sx={{ width: '150px', height: '45px' }}
              >
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
          </>
        )}
        {pageType === 'transfer' && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                color: '#dedede',
              }}
            >
              Transfer
            </Box>
            <Divider sx={{ padding: '8px' }} />

            <Box
              sx={{
                marginY: '25px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <TextField
                label="CSN"
                variant="outlined"
                onChange={(e) => setTransferID(e.target.value)}
              />

              <Button
                variant="outlined"
                color="success"
                size="large"
                sx={{ width: '150px', height: '45px', marginTop: '12px' }}
                disabled={transferID.length < 8} //check if 3 letters followed by 5 numbers
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setPageType('home');
                }}
                color="error"
                size="large"
                sx={{ width: '150px', height: '45px' }}
              >
                Return
              </Button>
            </Box>
          </>
        )}
        {pageType === 'keys' && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                color: '#dedede',
              }}
            >
              Keys
            </Box>
            <Divider sx={{ padding: '8px' }} />

            <List
              className={classes.scrollBar}
              disablePadding
              sx={{ maxHeight: '150px', overflow: 'auto' }}
            >
              {selectedHouse.keyholders.map((citizen) => (
                <ListItem divider>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    {citizen.length > 25 ? (
                      <Typography>{citizen.slice(0, 25) + '...'}</Typography>
                    ) : (
                      <Typography>{citizen}</Typography>
                    )}
                    <IconButton sx={{ margin: '0px', padding: '0px' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                marginY: '25px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setPageType('home');
                }}
                color="error"
                size="large"
                sx={{ width: '150px', height: '45px' }}
              >
                Return
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </div>
  );
};

export default memo(AddHouseModal);
