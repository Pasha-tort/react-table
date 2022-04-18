import { TypeBordList } from '../../data/dataCell'

export type TypeBordState = {
	data: TypeBordList
};

export enum TypeReducerBorb {
	setData = 'SET_DATA',
}

export type TypeActionBord = {
	type: TypeReducerBorb,
	payload: TypeBordList,
}