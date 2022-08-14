import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type StateModal = {
	openModal: boolean;
	children: React.ReactNode;
}

export enum TypeReducerModal {
	openModal = "SET_OPEN_MODEL",
}

const initialState: StateModal = {
	openModal: false,
	children: null,
}

const sliceModal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<boolean>) => {
			state.openModal = action.payload
		},
	},
});

const { actions: { openModal }, reducer } = sliceModal;
export {
	reducer,
	openModal,
}


// export const reducerModal = (
// 	state: StateModal = initialState,
// 	action: TypeActionModal,
// ) => {
// 	switch (action.type) {
// 		case TypeReducerModal.openModal:
// 			return {
// 				...state,
// 				openModal: action.payload,
// 			}
// 		default:
// 			return state;
// 	}
// }