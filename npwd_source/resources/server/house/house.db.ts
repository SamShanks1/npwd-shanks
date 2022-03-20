import {
  houseBaseInt,
  PropertiesInt,
  houseLocationInt
} from '../../../typings/house';
import { ResultSetHeader } from 'mysql2';
import DbInterface from '../db/db_wrapper';

export class _HouseDB {
  async fetchHouses(identifier: string): Promise<PropertiesInt[]> {
    const query =
      `SELECT 
      player_houses.id, player_houses.house, player_houses.keyholders, houselocations.label, houselocations.garage,
      houselocations.tier, houselocations.coords FROM player_houses,houselocations 
      WHERE player_houses.house = houselocations.name AND player_houses.citizenid = ?`;
    const [results] = await DbInterface._rawExec(query, [identifier]);
    return <PropertiesInt[]>results;
  }
}
const HouseDB = new _HouseDB();
export default HouseDB;
