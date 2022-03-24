import { useCallback } from 'react';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useNuiEvent } from 'fivem-nui-react-lib';
import { HouseEvents, DeleteKeyDTO } from '@typings/house';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { useHouseActions } from './useHouseActions';
import { DeleteMailDTO } from '@typings/mail';

interface HouseAPIValue {
    deleteKeyHolder: (keyData: DeleteKeyDTO) => Promise<void>;
}

export const useHouseAPI = (): HouseAPIValue => {
    const { addAlert } = useSnackbar();
    const { deleteLocalKeyHolder } = useHouseActions();
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
    return { deleteKeyHolder };
};
