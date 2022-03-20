import { RegisterNuiProxy } from './cl_utils';
import {
    GarageEvents,
  } from '../../typings/house';

RegisterNuiProxy(GarageEvents.TRACK_VEHICLE);
RegisterNuiProxy(GarageEvents.FETCH_VEHICLES);

