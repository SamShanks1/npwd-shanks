import { useRecoilState } from 'recoil';
import { houseStates } from './state';

export const useModal = () => {
  const [modalVisible, setModalVisible] = useRecoilState(houseStates.houseListModal);
  return { modalVisible, setModalVisible};
};
