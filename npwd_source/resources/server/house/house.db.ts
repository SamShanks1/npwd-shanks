import {
  houseBaseInt,
  PropertiesInt,
  houseLocationInt
} from '../../../typings/house';
import { ResultSetHeader } from 'mysql2';
import DbInterface from '../db/db_wrapper';



export class _HouseDB {


  async getName(citizenid: string): Promise<string> {
    const query =
      `SELECT charinfo FROM players WHERE citizenid = ?`;
    const [results] = await DbInterface._rawExec(query, [citizenid]);
    console.log(results)
    // return <String[]>results
    return "sam"
  }



  async fetchHouses(identifier: string): Promise<PropertiesInt[]> {
    const query =
      `SELECT 
      player_houses.id, player_houses.house, player_houses.keyholders, houselocations.label, houselocations.garage,
      houselocations.tier, houselocations.coords FROM player_houses,houselocations 
      WHERE player_houses.house = houselocations.name AND player_houses.citizenid = ?`;
    const [results] = await DbInterface._rawExec(query, [identifier]);
    const data = <PropertiesInt[]>results

    const newData = data.map(house => {
      const keyData = house.keyholders.map(key => {
        return {
          name: this.getName(key.citizenid),
          citizenid: key.citizenid
        }
      })
      return {
        label: house.label,
        coords: house.coords,
        tier: house.tier,
        garage: house.garage,
        id: house.id,
        house: house.house,
        keyholders: keyData
      }
    })


    return <PropertiesInt[]>results;
  }
}
const HouseDB = new _HouseDB();
export default HouseDB;
