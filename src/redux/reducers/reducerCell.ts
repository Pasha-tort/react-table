import {
	TypeCell,
	TypeActionPrevCell,
	TypeActionUpdateCell,
	TypeReducerCell,
	TypeActionCell,
} from '../types/typeCell';

const initialState = {
	prevCell: null,
	updateCell: null,
};

export const reducerCell = (
	state: TypeCell = initialState, 
	action: TypeActionCell,
) => {
	switch(action.type) {
		case TypeReducerCell.setPrevCell:
			return {
				...state,
				prevCell: (action as TypeActionPrevCell).payload,
			}
		case TypeReducerCell.updateCard:
			return {
				...state,
				updateCell: (action as TypeActionUpdateCell).payload,
			}
		default:
			return state;
	}
}