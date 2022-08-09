import { TypeReducerCell, PrevCell } from '../types/typeCell';
import { createAction, ThunkAction } from '@reduxjs/toolkit';
import { Request } from '../../hooks/useFetch';
import {rootReducer} from "../reducers";
import { setDataBord } from './actionsBord';
import { AnyAction } from 'redux';
import { Dispatch } from 'redux';

export const addCell = (request: Request): ThunkAction<void, typeof rootReducer, unknown, AnyAction> => async (dispatch: Dispatch<AnyAction>) => {
	request("http://localhost:3001/api/getAllData", "POST")
		.then(res => dispatch(setDataBord(res.items)))
		.catch(e => console.log(e));
}

// export const setPrevCell = (res: PrevCell) => {
// 	return {
// 		type: TypeReducerCell.setPrevCell,
// 		payload: res,
// 	}
// }

// export const updateCellF = (res: string | null) => {
// 	return {
// 		type: TypeReducerCell.updateCard,
// 		payload: res,
// 	}
// }

export const setPrevCell = createAction(TypeReducerCell.setPrevCell, (payload: PrevCell) => {
	return {payload};
});
export const updateCellF = createAction(TypeReducerCell.updateCard, (payload: string | null) => {
	return {payload};
});