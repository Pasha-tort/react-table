import {combineReducers} from 'redux'

//reducers
import { reducerBord } from './reducerBord';
import { reducerCursor } from './reducerCursor';

//types
import {TypeBordState} from '../types/typesBord';
import { TypeCursor } from '../types/typesCursor';

export type R = {
	reducerBord: TypeBordState,
	reducerCursor: TypeCursor,
}

export const rootReducer = combineReducers({
	reducerBord,
	reducerCursor,
});