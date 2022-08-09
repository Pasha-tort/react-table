import { TypeBordList } from '../../data/dataCell';
import { TypeReducerBorb } from '../types/typesBord';
import { Request } from '../../hooks/useFetch';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {ThunkAction} from "redux-thunk";
import {rootReducer} from "../reducers";
import { createAction } from '@reduxjs/toolkit';

export const fetchData = (request: Request): ThunkAction<void, typeof rootReducer, unknown, AnyAction> => async (dispatch: Dispatch<AnyAction>) => {
	request("http://localhost:3001/api/getAllData")
		.then(res => dispatch(setDataBord(res.items)))
		.catch(e => console.log(e));
}

export const setDataBord = createAction(TypeReducerBorb.setData, (items: any[]) => {
	return {
		payload: items,
	}
});

export type SetDataBordType = {
	type: TypeReducerBorb.setData,
	payload: any[],
}

// const setDataBord = (res: TypeBordList) => {
// 	return {
// 		type: TypeReducerBorb.setData,
// 		payload: res,
// 	}
// }

// export {
// 	setDataBord,
// }