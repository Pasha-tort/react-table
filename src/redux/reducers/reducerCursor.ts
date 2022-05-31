import { TypeCursor, TypeActionCursor, TypeReducerCursor } from '../types/typesCursor';

const initialState = {
	clientX: undefined,
	clientY: undefined,
};

export const reducerCursor = (state: TypeCursor = initialState, action: TypeActionCursor) => {
	switch(action.type) {
		case TypeReducerCursor.setClientX:
			return {
				...state,
				clientX: action.payload,
			};
		case TypeReducerCursor.setClientY:
			return {
				...state,
				clientY: action.payload
			}
		default:
			return state;
	}
}