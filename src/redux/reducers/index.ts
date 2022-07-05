import {combineReducers} from 'redux'

//reducers
import { reducerBord } from './reducerBord';
import { reducerCursor } from './reducerCursor';
import { reducerCard } from './reducerCard';

//types
import {TypeBordState} from '../types/typesBord';
import { TypeCursor } from '../types/typesCursor';
import { TypeCard } from '../types/typeCard';

export type R = {
	reducerBord: TypeBordState,
	reducerCursor: TypeCursor,
	reducerCard: TypeCard
}

export const rootReducer = combineReducers({
	reducerBord,
	reducerCursor,
	reducerCard,
});