import { createReducer } from '@reduxjs/toolkit';
import { data, TypeBordList } from '../../data/dataCell';
import { SetDataBordType } from '../actions/actionsBord';
import { TypeBordState, TypeActionBord, TypeReducerBorb } from '../types/typesBord';

type InitialState = {
	data: TypeBordList,
}

const initialState: InitialState = {
	data: [],
};

export const reducerBord = createReducer(initialState, builder => {
	builder
		.addCase(TypeReducerBorb.setData, (state, action: SetDataBordType) => {
			state.data = action.payload
		})
});

// export const reducerBord = (state: TypeBordState = initialState, action: TypeActionBord) => {
// 	switch(action.type) {
// 		case TypeReducerBorb.setData:
// 			return {
// 				data: action.payload
// 			};
// 		default:
// 			return state;
// 	}
// }