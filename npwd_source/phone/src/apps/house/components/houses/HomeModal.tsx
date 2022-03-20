import { Box, Button, Divider } from '@mui/material';
import { PropertiesInt } from '@typings/house';
import React from 'react';
import { useSelectedHouse } from '../../hooks/state';

const HomeModal = ({ setPageType, handleClose }) => {
  const [selectedHouse, setselectedHouse] = useSelectedHouse();
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
  );
};

export default HomeModal;
