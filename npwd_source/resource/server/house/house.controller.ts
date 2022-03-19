
import { onNetPromise } from '../lib/PromiseNetEvents/onNetPromise';
import {
    HouseEvents,
    PropertiesInt,
  } from '../../../typings/house';
  import { houseLogger } from './house.utils';
  import HouseSerivce from './house.service';

onNetPromise<void, PropertiesInt[]>(HouseEvents.FETCH_HOUSES, async (reqObj, resp) => {
  HouseSerivce.handleFetchHouses(reqObj, resp).catch((e) => {
    houseLogger.error(
        `Error occurred in fetch house event (${reqObj.source}), Error: ${e.message}`,
      );
      resp({ status: 'error', errorMsg: 'INTERNAL_ERROR' });
    });
  });