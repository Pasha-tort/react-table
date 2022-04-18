import {combineReducers} from 'redux'

//reducers
import { reducerBord } from './reducerBord';

//types
import {TypeBordState} from '../types/typesBord';

export type R = {
	reducerBord: TypeBordState,
}

export const rootReducer = combineReducers({
	reducerBord,
});