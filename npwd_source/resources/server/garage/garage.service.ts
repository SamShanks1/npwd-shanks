import PlayerService from '../players/player.service';
import { garageLogger } from './garage.utils';
import GarageDB, { _GarageDB } from './garage.db';
import {
  VehicleInterface, VehicleTrackInt,
} from '../../../typings/garage';


import { PromiseEventResp, PromiseRequest } from '../lib/PromiseNetEvents/promise.types';

class _GarageService {
  private readonly garageDB: _GarageDB;

  constructor() {
    this.garageDB = GarageDB;
    garageLogger.debug('Garage service started');
  }

  async handleFetchVehicles(
    reqObj: PromiseRequest<void>,
    resp: PromiseEventResp<VehicleInterface[]>,
  ) {
    const identifier = PlayerService.getIdentifier(reqObj.source);
    try {
      const listings = await this.garageDB.fetchVehicles(identifier);
      resp({ data: listings, status: 'ok' });
    } catch (e) {
        garageLogger.error(`Failed to fetch vehicles, ${e.message}`, {
        source: reqObj.source,
      });
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }

  async handleTrackVehicle(
    reqObj: PromiseRequest<VehicleTrackInt>,
    resp: PromiseEventResp<void>,
  ): Promise<void> {
    try {
      resp({ status: 'ok' });
      emitNet('npwd:client:trackVehicle', reqObj.source, [reqObj.data.plate]);
    } catch (e) {
      garageLogger.error(`Failed to track vehicle, ${e.message}`);

      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }


}

const GarageService = new _GarageService();
export default GarageService;
