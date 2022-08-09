import { createAction } from '@reduxjs/toolkit';
import { TypeReducerModal, StateModal } from '../types/typeModal';


// export const setOpenModal = (res: StateModal) => {
// 	return {
// 		type: TypeReducerModal.openModal,
// 		payload: res,
// 	}
// }

export const setOpenModal = createAction(TypeReducerModal.openModal, (payload) => {
	return {payload};
});