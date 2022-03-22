import {
  houseBaseInt,
  PropertiesInt,
  houseLocationInt,
  BeforePropertiesInt,
} from '../../../typings/house';
import { ResultSetHeader } from 'mysql2';
import DbInterface from '../db/db_wrapper';
import { AnyRecord } from 'dns';

interface keyHold {
  name: string;
  citizenid: string;
}

interface charinfo {
  account: string;
  firstname: string;
  gender: number;
  backstory: string;
  phone: string;
  cid: string;
  lastname: string;
  brithdate: string;
  nationality: string;
}

interface initialChar {
  charinfo: string
}

interface dbshit {
  id: number;
  house: string;
  keyholders: string;
  label: string;
  garage: string;
  tier: number;
  coords: string
}

export class _HouseDB {
  async getName(citizenid: string): Promise<string> {
    const query =
      `SELECT charinfo FROM players WHERE citizenid = ?`;
    const [results] = await DbInterface._rawExec(query, [citizenid]);
    const data = <initialChar[]>results
    const newData: charinfo = JSON.parse(data[0].charinfo)
    console.log('test')
    return <string>newData.firstname + " " + newData.lastname
  }

  async fetchHouses(identifier: string): Promise<PropertiesInt[]> {
    const query =
      `SELECT 
      player_houses.id, player_houses.house, player_houses.keyholders, houselocations.label, houselocations.garage,
      houselocations.tier, houselocations.coords FROM player_houses,houselocations 
      WHERE player_houses.house = houselocations.name AND player_houses.citizenid = ?`;
    const [results] = await DbInterface._rawExec(query, [identifier]);
    const data = <dbshit[]>results
    const parse: BeforePropertiesInt[] = data.map(house => {
      return {
        id: house.id,
        house: house.house,
        keyholders: JSON.parse(house.keyholders),
        label: house.label,
        garage: JSON.parse(house.garage),
        tier: house.tier,
        coords: JSON.parse(house.coords)
      }
    })

    parse.forEach((house) => {
      const newData = house.keyholders.map(async (keyH: any) => {
        const shit = {
          name: "shanks",
          citizenid: keyH
        }
        return shit;
      });
      house.keyholders = newData;
    })


    console.log(parse)
    return <PropertiesInt[]>parse;
  }
}
const HouseDB = new _HouseDB();
export default HouseDB;
