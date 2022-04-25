import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import BuildIcon from '@mui/icons-material/Build';
import { VehicleInterface } from '@typings/garage';
import fetchNui from '../../../utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { GarageEvents } from '@typings/garage';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';

const VehicleItems = ({ data }: { data: VehicleInterface }) => {
  const { addAlert } = useSnackbar();
  const handleTrackVehicle = (plate: string) => {
    fetchNui<ServerPromiseResp>(GarageEvents.TRACK_VEHICLE, {
      plate: plate,
    }).then((resp) => {
      if (resp.status !== 'ok') {
        return addAlert({
          message: 'Error Tracking Vehicle',
          type: 'error',
        });
      }
    });
  };

  return (
    <Accordion
      elevation={0}
      sx={{
        '&:before': {
          display: 'none',
        },
        mb: 1,
        bgcolor: '#294762',
        borderTopRightRadius: '7px',
        borderTopLeftRadius: '7px',
        borderBottom: '4px solid',

        ...(data.state === 1 && {
          borderBottomColor: '#006902',
        }),
        ...(data.state === 0 && {
          borderBottomColor: '#a36900',
        }),
        ...(data.state === 2 && {
          borderBottomColor: '#8b0000',
        }),
        ...(data.state === 3 && {
          borderBottomColor: '#8b0000',
        }),
      }}
    >
      <AccordionSummary sx={{ height: '70px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
            }}
          >
            <DirectionsCarIcon sx={{ fontSize: 50 }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <Typography sx={{ fontSize: 17 }}>{data.vehicle}</Typography>
              <Typography sx={{ fontSize: 17 }}>{data.plate}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            {data.state === 0 && <Typography>OUT</Typography>}
            {data.state === 1 && <Typography>STORED</Typography>}
            {data.state === 2 && <Typography>IMPOUNDED</Typography>}
            {data.state === 3 && <Typography>SEIZED</Typography>}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* NEEDS BETTER ICONS */}
        <List sx={{ width: '70%' }}>
          <ListItem disablePadding sx={{ borderBottom: '1px solid white', mb: '8px' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Location">
                <LocationOnIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={data.garage} />
          </ListItem>

          <ListItem disablePadding sx={{ borderBottom: '1px solid white', mb: '8px' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Engine">
                <BuildIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={<Typography>{Math.ceil(data.fuel)}%</Typography>} />
          </ListItem>
          <ListItem disablePadding sx={{ borderBottom: '1px solid white', mb: '8px' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Fuel">
                <LocalGasStationIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={<Typography>{Math.ceil(data.engine / 10)}%</Typography>} />
          </ListItem>
          <ListItem disablePadding sx={{ borderBottom: '1px solid white', mb: '8px' }}>
            <ListItemIcon sx={{ ml: '5px', mr: '20px', minWidth: '25px' }}>
              <Tooltip title="Body">
                <DirectionsCarIcon />
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={<Typography>{Math.ceil(data.body / 10)}%</Typography>} />
          </ListItem>
        </List>

        <Button color="success" variant="contained" onClick={() => handleTrackVehicle(data.plate)} disabled={data.state !== 0}>
          Track
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default VehicleItems;
