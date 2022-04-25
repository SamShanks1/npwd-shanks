import { RegisterNuiProxy, RegisterNuiCB  } from './cl_utils';
import {
  HouseBroadcastKeyAddDTO,
  houseCoords,
  HouseEvents,
  PropertiesInt,
} from '../../typings/house';
import { sendHouseEvent } from '../utils/messages';


RegisterNuiProxy(HouseEvents.FETCH_HOUSES);
RegisterNuiProxy(HouseEvents.FETCH_KEYS);
RegisterNuiProxy(HouseEvents.DELETE_KEY_HOLDER);
RegisterNuiProxy(HouseEvents.TRANSFER_HOUSE)

onNet('npwd:addNewKeyHolder', (broadcastEvent: HouseBroadcastKeyAddDTO) => {
  sendHouseEvent(HouseEvents.ADD_KEY_HOLDER, broadcastEvent);
});

onNet('npwd:addHouseEvent', (broadcastEvent: PropertiesInt) => {
  sendHouseEvent(HouseEvents.ADD_HOUSE, broadcastEvent);
});

RegisterNuiCB(HouseEvents.MARK_HOUSE, ({ coords }: { coords: houseCoords }) => {
  SetNewWaypoint(coords.x, coords.y);
});



