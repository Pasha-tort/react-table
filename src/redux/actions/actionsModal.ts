import { TypeReducerModal, StateModal } from '../types/typeModal';


export const setOpenModal = (res: StateModal) => {
	return {
		type: TypeReducerModal.openModal,
		payload: res,
	}
}