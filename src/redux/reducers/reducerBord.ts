import { data } from '../../data/dataCell';
import { TypeBordState, TypeActionBord, TypeReducerBorb } from '../types/typesBord';

const initialState = {
	data,
};

export const reducerBord = (state: TypeBordState = initialState, action: TypeActionBord) => {
	switch(action.type) {
		case TypeReducerBorb.setData:
			console.log(action.payload)
			return {
				data: action.payload
			};
		default:
			return state;
	}
}