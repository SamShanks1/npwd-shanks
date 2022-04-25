import React from 'react';
import { Box, Button, Divider, TextField } from '@mui/material';
import { useHouseAPI } from '../../hooks/useHouseAPI';

const TransferModal = ({ setPageType, transferID, setTransferID, selectedHouseData }) => {
  const { transferHouse } = useHouseAPI();

  const handleHouseTransfer = () => {
    const houseTransferDataS = {
      house: selectedHouseData.house,
      citizenid: transferID,
    };
    transferHouse({ data: houseTransferDataS })
      .then(() => {
        console.log('success');
      })
      .catch(console.error);
  };

  return (
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
        <TextField label="CSN" variant="outlined" onChange={(e) => setTransferID(e.target.value)} />

        <Button
          variant="outlined"
          color="success"
          size="large"
          sx={{ width: '150px', height: '45px', marginTop: '12px' }}
          disabled={transferID.length < 8} //check if 3 letters followed by 5 numbers
          onClick={() => handleHouseTransfer()}
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
  );
};

export default TransferModal;
