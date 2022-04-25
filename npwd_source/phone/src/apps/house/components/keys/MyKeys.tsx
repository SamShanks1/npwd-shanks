import React from 'react';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { Box, List, ListItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { houseStates, useMyKeys } from '../../hooks/state';
import { useSetRecoilState } from 'recoil';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSetSelectedHouse } from '../../hooks/state';
import { houseCoords, HouseEvents, PropertiesInt } from '@typings/house';
import fetchNui from '../../../../utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';

export const MyKeys: React.FC = () => {

  const { addAlert } = useSnackbar();

  const houses = useMyKeys();

  const setWaypoint = (coords: houseCoords) => {
    fetchNui<ServerPromiseResp>(HouseEvents.MARK_HOUSE, {
      coords: coords,
    }).then((resp) => {
      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Error Setting Waypoint',
          type: 'error',
        });
      }
    });
  };

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
    <List disablePadding>
      {houses.map((house) => (
        <ListItem key={house.id} divider button onClick={()=>setWaypoint(house.coords.enter)}>
          <Box
            sx={{
              borderRadius: '5px',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'center',
              paddingY: "2px"
            }}
          >
            <KeyIcon sx={{ fontSize: 32 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '2px',
                gap: "4px"
              }}
            >
              <Typography sx={{ color: '#dedede', fontSize: '17px' }}>{house.label}</Typography>
            </Box>
          </Box>
        </ListItem>
      ))}
    </List>
  </React.Suspense>
  );
};
