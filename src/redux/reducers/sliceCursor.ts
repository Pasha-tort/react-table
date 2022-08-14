import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TypeCursor, TypeActionCursor, TypeReducerCursor } from '../types/typesCursor';

export type TypeCursor = {
	clientX?: number;
	clientY?: number;
}

export enum TypeReducerCursor {
	setClientX = "SET_CLIENT_X",
	setClientY = "SET_CLIENT_Y",
}

const initialState: TypeCursor = {
	clientX: undefined,
	clientY: undefined,
};

const sliceCursor = createSlice({
	name: "cursor",
	initialState,
	reducers: {
		setClientX: ({clientX}, action: PayloadAction<number>) => {clientX = action.payload},
		setClientY: ({clientY}, action: PayloadAction<number>) => {clientY = action.payload},
	},
});

const {actions, reducer} = sliceCursor;
const {setClientX, setClientY} = actions;
export {
	reducer,
	setClientX,
	setClientY,
}

// export const reducerCursor = (state: TypeCursor = initialState, action: TypeActionCursor) => {
// 	switch(action.type) {
// 		case TypeReducerCursor.setClientX:
// 			return {
// 				...state,
// 				clientX: action.payload,
// 			};
// 		case TypeReducerCursor.setClientY:
// 			return {
// 				...state,
// 				clientY: action.payload
// 			}
// 		default:
// 			return state;
// 	}
// }