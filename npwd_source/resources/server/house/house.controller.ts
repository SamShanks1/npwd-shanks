
import { onNetPromise } from '../lib/PromiseNetEvents/onNetPromise';
import {
  DeleteKeyDTO,
    HouseEvents,
    houseTransDTO,
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


  onNetPromise<DeleteKeyDTO, DeleteKeyDTO>(HouseEvents.DELETE_KEY_HOLDER, async (reqObj, resp) => {
    HouseSerivce.handleDeleteKeyholder(reqObj, resp).catch((e) => {
      houseLogger.error(
        `Error occured in delete keyholder event (${reqObj.source}), Error:  ${e.message}`,
      );
      resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
    });
  });

  onNetPromise<houseTransDTO, houseTransDTO>(HouseEvents.TRANSFER_HOUSE, async (reqObj, resp) => {
    HouseSerivce.handleTransferHouse(reqObj, resp).catch((e) => {
      houseLogger.error(
        `Error occured in transfering house (${reqObj.source}), Error:  ${e.message}`,
      );
      resp({ status: 'error', errorMsg: 'UNKNOWN_ERROR' });
    });
  });