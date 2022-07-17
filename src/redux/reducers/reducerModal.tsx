import { StateModal, TypeActionModal, TypeReducerModal } from '../types/typeModal';

const initialState = {
	openModal: false,
	children: null,
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
		default:
			return state;
	}
}