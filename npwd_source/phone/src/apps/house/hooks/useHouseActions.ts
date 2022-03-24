import { useHouseValue, useSetHouse, useSetSelectedHouse } from './state';
import { useCallback } from 'react';
import { keyHold, addKeyHolder } from '@typings/house';

interface UseHouseActionsValue {
    deleteLocalKeyHolder: (keyData: keyHold) => void;
    giveHouseKey: (addKeyData: addKeyHolder) => void;
}

export const useHouseActions = (): UseHouseActionsValue => {
    const setHouse = useSetHouse();
    const houses = useHouseValue();
    const setSelectedHouse = useSetSelectedHouse();

    const deleteLocalKeyHolder = useCallback(
        (keyData) => {
            const test = houses.find(element => element.house === keyData.house)
            const testF = test.keyholders.filter(house => { return house.citizenid !== keyData.citizenid })
            const newObj = {
                id: test.id,
                house: test.house,
                keyholders: testF,
                label: test.label,
                tier: test.tier,
                coords: test.coords,
                garage: test.garage,
            }
            setHouse((currHouse) => {
                const targetIndex = currHouse.findIndex((house) => house.house === keyData.house);
                const newHouseArray = [...currHouse];
                newHouseArray[targetIndex] = newObj;
                return newHouseArray;
            })
            setSelectedHouse(newObj)
        },
        [houses, setHouse, setSelectedHouse],
    );


    const giveHouseKey = useCallback(
        (data: addKeyHolder) => {
            const test = houses.find(element => element.house === data.house)
            const insertData = {
                name: data.name,
                citizenid: data.citizenid
            }
            let keyData = [...test.keyholders, insertData]
            const newObj = {
                id: test.id,
                house: test.house,
                keyholders: keyData,
                label: test.label,
                tier: test.tier,
                coords: test.coords,
                garage: test.garage,
            }
            setHouse((currHouse) => {

                const targetIndex = currHouse.findIndex((house) => house.house === data.house);
                const newHouseArray = [...currHouse];
                newHouseArray[targetIndex] = newObj;
                return newHouseArray;
            })
            setSelectedHouse(newObj)
        },
        [houses, setHouse, setSelectedHouse],
    );



    return { deleteLocalKeyHolder, giveHouseKey };
};
