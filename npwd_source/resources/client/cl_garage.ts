import { RegisterNuiProxy } from './cl_utils';
import {
    HouseEvents,
  } from '../../typings/house';

RegisterNuiProxy(HouseEvents.FETCH_HOUSES);