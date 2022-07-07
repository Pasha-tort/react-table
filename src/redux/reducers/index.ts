import {combineReducers} from 'redux'

//reducers
import { reducerBord } from './reducerBord';
import { reducerCursor } from './reducerCursor';
import { reducerCard } from './reducerCard';
import { reducerCell } from './reducerCell';

//types
import {TypeBordState} from '../types/typesBord';
import { TypeCursor } from '../types/typesCursor';
import { TypeCard } from '../types/typeCard';
import { TypeCell } from '../types/typeCell';

export type R = {
	reducerBord: TypeBordState,
	reducerCursor: TypeCursor,
	reducerCard: TypeCard
	reducerCell: TypeCell,
}

export const rootReducer = combineReducers({
	reducerBord,
	reducerCursor,
	reducerCard,
	reducerCell,
});