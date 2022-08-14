import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
// 	TypeCell,
// 	TypeActionPrevCell,
// 	TypeActionUpdateCell,
// 	TypeReducerCell,
// 	TypeActionCell,
// } from '../types/typeCell';

export type TypeCell = {
	prevCell: PrevCell | null;
	updateCell: string | null;
}

export type PrevCell = {
	el: HTMLElement;
	id: string;
	numberCellDrop: number;
	positionDrop: PositionDrop;
}
export type PositionDrop = "before" | "after" | "noDrag";
export enum TypeReducerCell {
	setPrevCell = "SET_PREV_CELL",
	updateCard = "UPDATE_CARD",
}

const initialState: TypeCell = {
	prevCell: null!,
	updateCell: null!,
};

const sliceCell = createSlice({
	name: "cell",
	initialState,
	reducers: {
		setPrevCell: (state, action: PayloadAction<PrevCell>) => ({
			...state,
			prevCell: action.payload,
		}),
		updateCellFunc: (state, action: PayloadAction<string | null>) => {
			state.updateCell = action.payload;
		}
	}
});

const {actions, reducer} = sliceCell;
const {setPrevCell, updateCellFunc} = actions;
export {
	reducer,
	setPrevCell,
	updateCellFunc,
}

// export const reducerCell = (
// 	state: TypeCell = initialState, 
// 	action: TypeActionCell,
// ) => {
// 	switch(action.type) {
// 		case TypeReducerCell.setPrevCell:
// 			return {
// 				...state,
// 				prevCell: (action as TypeActionPrevCell).payload,
// 			}
// 		case TypeReducerCell.updateCard:
// 			return {
// 				...state,
// 				updateCell: (action as TypeActionUpdateCell).payload,
// 			}
// 		default:
// 			return state;
// 	}
// }