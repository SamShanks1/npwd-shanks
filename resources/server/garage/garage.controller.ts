
import { onNetPromise } from '../lib/PromiseNetEvents/onNetPromise';
import {
    GarageEvents,
    VehicleInterface,
    VehicleTrackInt
  } from '../../../typings/garage';
  import { garageLogger } from './garage.utils';
  import GarageService from './garage.service';

onNetPromise<void, VehicleInterface[]>(GarageEvents.FETCH_VEHICLES, async (reqObj, resp) => {
  GarageService.handleFetchVehicles(reqObj, resp).catch((e) => {
        garageLogger.error(
        `Error occurred in fetch listing event (${reqObj.source}), Error: ${e.message}`,
      );
      resp({ status: 'error', errorMsg: 'INTERNAL_ERROR' });
    });
  });



  onNetPromise<VehicleTrackInt>(GarageEvents.TRACK_VEHICLE, async (reqObj, resp) => {
    GarageService.handleTrackVehicle(reqObj, resp).catch((e) => {
      garageLogger.error(
        `Error occurred in tracking vehicle (${reqObj.source}), Error: ${e.message}`,
      );
      resp({ status: 'error', errorMsg: 'INTERNAL_ERROR' });
    });
  });