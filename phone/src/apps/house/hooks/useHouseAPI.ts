import { useCallback } from 'react';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { HouseEvents, DeleteKeyDTO, houseTransDTO } from '@typings/house';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { useHouseActions } from './useHouseActions';
import { houseStates } from './state';
import { useSetRecoilState } from 'recoil';
interface HouseAPIValue {
    deleteKeyHolder: (keyData: DeleteKeyDTO) => Promise<void>;
    transferHouse: (houseData: houseTransDTO) => Promise<void>;
}

export const useHouseAPI = (): HouseAPIValue => {
    const setModalVisible = useSetRecoilState(houseStates.houseListModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const closeModal = () => setModalVisible(false);
    const { addAlert } = useSnackbar();
    const { deleteLocalKeyHolder, deleteHouse } = useHouseActions();
    const deleteKeyHolder = useCallback(
        async (data: DeleteKeyDTO) => {
            const resp = await fetchNui<ServerPromiseResp<DeleteKeyDTO>>(HouseEvents.DELETE_KEY_HOLDER, data);
            if (resp.status !== 'ok') {
                return addAlert({
                    message: `Failed to remove ${data.data.name} key`,
                    type: 'error',
                });
            }
            deleteLocalKeyHolder(data.data);
            addAlert({
                message: `Successfully removed ${data.data.name} key`,
                type: 'success',
            });
        },
        [addAlert, deleteLocalKeyHolder],
    );

    const transferHouse = useCallback(
        async (data: houseTransDTO) => {
            const resp = await fetchNui<ServerPromiseResp<houseTransDTO>>(HouseEvents.TRANSFER_HOUSE, data);
            if (resp.status !== 'ok') {
                return addAlert({
                    message: `Failed to transfer house`,
                    type: 'error',
                });
            }
            deleteHouse(data.data)
            closeModal()
            addAlert({
                message: `Successfully transfered house`,
                type: 'success',
            });
        },
        [addAlert, closeModal, deleteHouse],
    )

    return { deleteKeyHolder, transferHouse };
};
