import { RegisterNuiProxy } from './cl_utils';
import {
  GarageEvents,
} from '../../typings/garage';

RegisterNuiProxy(GarageEvents.TRACK_VEHICLE);
RegisterNuiProxy(GarageEvents.FETCH_VEHICLES);