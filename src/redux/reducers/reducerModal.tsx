import { StateModal, TypeActionModal, TypeReducerModal } from '../types/typeModal';

const initialState = {
	openModalMini: {
		idCell: null,
		state: false,
	},
	openModal: false,
}

export const reducerModal = (
	state: StateModal = initialState,
	action: TypeActionModal,
) => {
	switch (action.type) {
		case TypeReducerModal.openModal:
			return {
				...state,
				openModal: action.payload,
			}
		case TypeReducerModal.openModalMini:
			return {
				...state,
				openModalMini: action.payload,
			}
		default:
			return state;
	}
}