import { TypeReducerModal, StateModalMini } from '../types/typeModal';

export const setOpenModalMini = (res: StateModalMini) => {
	return {
		type: TypeReducerModal.openModalMini,
		payload: res,
	}
}

export const setOpenModal = (res: boolean) => {
	return {
		type: TypeReducerModal.openModal,
		payload: res,
	}
}