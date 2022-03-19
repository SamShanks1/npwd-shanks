import {
    VehicleInterface,
  } from '../../../typings/garage';
  import { ResultSetHeader } from 'mysql2';
  import DbInterface from '../db/db_wrapper';
  
  export class _GarageDB {
    async fetchVehicles(identifier: string): Promise<VehicleInterface[]> {
      const query = 'SELECT vehicle, plate, fuel, engine, body, garage, state FROM player_vehicles WHERE citizenid = ?';
      const [results] = await DbInterface._rawExec(query, [identifier]);
      const data = <VehicleInterface[]>results
      data.forEach(veh => {
        veh.vehicle = global.exports["qb-garages"]["npwd"]("vehicleName", veh.vehicle);
        veh.garage = global.exports["qb-garages"]["npwd"]("garageName", veh.garage);
      })
      return data;
    }
  }
  
  const GarageDB = new _GarageDB();
  
  export default GarageDB;
  