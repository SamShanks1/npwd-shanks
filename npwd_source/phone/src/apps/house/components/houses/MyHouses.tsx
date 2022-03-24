import React from 'react';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { Box, List, ListItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import { houseStates, useHouseValue } from '../../hooks/state';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useSetRecoilState } from 'recoil';
import { useSetSelectedHouse } from '../../hooks/state';
import { PropertiesInt } from '@typings/house';

export const MyHouses: React.FC = () => {
  const houses = useHouseValue();
  const setModalVisible = useSetRecoilState(houseStates.houseListModal);
  const openModal = () => setModalVisible(true);
  const setHouse = useSetSelectedHouse();

  const handleHouseModal = (house: PropertiesInt) => {
    openModal()
    setHouse(house)
  }

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <List disablePadding>
        {houses.map((house) => (
          <ListItem key={house.id} divider button onClick={()=>handleHouseModal(house)}>
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
              <HomeIcon sx={{ fontSize: 32 }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2px',
                  gap: "4px"
                }}
              >
                <Typography sx={{ color: '#dedede', fontSize: '17px' }}>{house.label}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
                  >
                    <KeyIcon sx={{ fontSize: 20 }} />
                    <Typography sx={{ color: '#dedede', fontSize: '15px' }}>
                      {house.keyholders.length}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
                  >
                    <HouseSidingIcon sx={{ fontSize: 20 }} />
                    {(house.garage.x === 0 && house.garage.z === 0)   //check if coords = 0 rather than if not null
                      ? <CloseIcon sx={{fontSize: 16,stroke: "white", strokeWidth: 2}}/>
                      : <DoneIcon sx={{fontSize: 16, stroke: "white", strokeWidth: 2  }}/> }
                  </Box>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </React.Suspense>
  );
};
