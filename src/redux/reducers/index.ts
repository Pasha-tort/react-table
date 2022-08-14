import {combineReducers} from 'redux'

//reducers
// import { reducerBord } from './reducerBord';
// import { reducerCursor } from './reducerCursor';
// import { reducerCard } from './reducerCard';
// import { reducerCell } from './reducerCell';
// import {reducerModal} from "./reducerModal";

//types
// import {TypeBordState} from '../types/typesBord';
// import { TypeCursor } from '../types/typesCursor';
// import { TypeCard } from '../types/typeCard';
// import { TypeCell } from '../types/typeCell';
// import { StateModal } from '../types/typeModal';

// export type R = {
// 	reducerBord: TypeBordState,
// 	reducerCursor: TypeCursor,
// 	reducerCard: TypeCard
// 	reducerCell: TypeCell,
// 	reducerModal: StateModal,
// }

import {reducer as reducerCard} from "./sliceCard";
import {reducer as reducerBord} from "./sliceBord";
import {reducer as reducerCell} from "./sliceCell";
import {reducer as reducerCursor} from "./sliceCursor";
import {reducer as reducerModal} from './sliceModal';

export const rootReducer = combineReducers({
	reducerCard,
	reducerBord,
	reducerCell,
	reducerCursor,
	reducerModal,
});