import React, { useEffect } from 'react';
import { List } from '@ui/components/List';
import { useFilterValueState, useFilteredGarageValue, useGarageValue } from '../hooks/state';
import VehicleItem from './VehicleItem';
import { Box, Typography } from '@mui/material';
import { SearchField } from '@ui/components/SearchField';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { useGarageAPI } from '../hooks/useGarageAPI';


export const VehicleList: React.FC = () => {
  const filteredListings = useFilteredGarageValue();
  const garage = useGarageValue();
  const [searchValue, setSearchValue] = useFilterValueState();
  const { addNewVehicles } = useGarageAPI();
  useEffect(() => {
    addNewVehicles()
    .then(() => {
      console.log('success')
    })
    .catch(console.error);
  }, [addNewVehicles]);

  if (garage && garage.length) 
    return (
      <>
        <SearchField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Garage..."
        />
        <List>
          <Box height="100%" width="100%" pl={2} pr={2}>
            {[...filteredListings].map((vehicle) => (
              <VehicleItem key={vehicle.id} data={vehicle} />
            ))}
          </Box>
        </List>
      </>
    );

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
      >
        <Typography color="inherit" variant="h6" style={{ fontWeight: 300 }}>
          You have no vehicles
        </Typography>
      </Box>
    );
};
