import { RegisterNuiProxy } from './cl_utils';
import {
  HouseBroadcastAddDTO,
  HouseEvents,
} from '../../typings/house';
import { sendHouseEvent } from '../utils/messages';


RegisterNuiProxy(HouseEvents.FETCH_HOUSES);
RegisterNuiProxy(HouseEvents.DELETE_KEY_HOLDER);


onNet('npwd:addNewKeyHolder', (broadcastEvent: HouseBroadcastAddDTO) => {
  sendHouseEvent(HouseEvents.ADD_KEY_HOLDER, broadcastEvent);
});



