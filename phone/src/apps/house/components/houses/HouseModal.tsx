import React, { memo, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import makeStyles from '@mui/styles/makeStyles';
import {  Paper } from '@mui/material';
import { useSelectedHouse } from '../../hooks/state';
import HomeModal from './HomeModal';
import TransferModal from './TransferModal';
import KeysModal from './KeysModal';
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
        {pageType === 'home' && <HomeModal setPageType={setPageType} handleClose={handleClose} />}
        {pageType === 'transfer' && (
          <TransferModal
            setPageType={setPageType}
            transferID={transferID}
            setTransferID={setTransferID}
            selectedHouseData={selectedHouse}
          />
        )}
        {pageType === 'keys' && <KeysModal setPageType={setPageType} />}
      </Paper>
    </div>
  );
};

export default memo(AddHouseModal);
