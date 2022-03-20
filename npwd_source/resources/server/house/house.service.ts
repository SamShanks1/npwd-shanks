import PlayerService from '../players/player.service';
import { houseLogger } from './house.utils';
import HouseDB, { _HouseDB } from './house.db';
import {
  PropertiesInt,
} from '../../../typings/house';


import { PromiseEventResp, PromiseRequest } from '../lib/PromiseNetEvents/promise.types';

class _HouseService {
  private readonly houseDB: _HouseDB;
  constructor() {
    this.houseDB = HouseDB;
    houseLogger.debug('House service started');
  }
  async handleFetchHouses(
    reqObj: PromiseRequest<void>,
    resp: PromiseEventResp<PropertiesInt[]>,
  ) {
    const identifier = PlayerService.getIdentifier(reqObj.source);
    try {
      const listings = await this.houseDB.fetchHouses(identifier);
      resp({ data: listings, status: 'ok' });
    } catch (e) {
      houseLogger.error(`Failed to fetch houses, ${e.message}`, {
        source: reqObj.source,
      });
      resp({ status: 'error', errorMsg: 'GENERIC_DB_ERROR' });
    }
  }
}

const HouseSerivce = new _HouseService();
export default HouseSerivce;
