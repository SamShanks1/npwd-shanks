import { RegisterNuiProxy } from './cl_utils';
import {
  HouseBroadcastKeyAddDTO,
  HouseEvents,
  PropertiesInt,
} from '../../typings/house';
import { sendHouseEvent } from '../utils/messages';


RegisterNuiProxy(HouseEvents.FETCH_HOUSES);
RegisterNuiProxy(HouseEvents.DELETE_KEY_HOLDER);


onNet('npwd:addNewKeyHolder', (broadcastEvent: HouseBroadcastKeyAddDTO) => {
  sendHouseEvent(HouseEvents.ADD_KEY_HOLDER, broadcastEvent);
});

onNet('npwd:addHouseEvent', (broadcastEvent: PropertiesInt) => {
  sendHouseEvent(HouseEvents.ADD_HOUSE, broadcastEvent);
});



