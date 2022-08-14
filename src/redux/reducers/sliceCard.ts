import { 
	createSlice, 
	PayloadAction 
} from '@reduxjs/toolkit';

export type TypeCard = {
	prevCard: PrevCard;
	updateCard: string | null;
}
export type PrevCard = {
	el: HTMLElement;
	id: string;
	numberCardDrop: number;
  positionDrop: PositionDrop;
}
export type PositionDrop = 'before' | 'after' | 'noDrag';
export enum TypeReducerCard {
  setPrevCard = 'SET_PREV_CARD',
  setNextCard = 'SET_NEXT_CARD',
  updateCard = 'UPDATE_CARD',
}

const initialState: TypeCard = {
	prevCard: null!,
	updateCard: null!,
};

export const sliceCard = createSlice({
	name: "card",
	initialState,
	reducers: {
		setPrevCard: (state, action: PayloadAction<PrevCard>) => ({
			...state,
			prevCard: action.payload,
		}),
		updateCardFunc: (state, action: PayloadAction<string | null>) => {
			state.updateCard = action.payload
		},
	}
});

const {actions, reducer} = sliceCard;
const {setPrevCard, updateCardFunc} = actions;
export {
	reducer,
	setPrevCard,
	updateCardFunc,
};

// export const reducerCard = (state: TypeCard = initialState, action: TypeActionCard) => {
// 	switch(action.type) {
// 		case TypeReducerCard.setPrevCard:
// 			return {
// 				...state,
// 				prevCard: (action as TypeActionPrevCard).payload,
// 			}
// 		case TypeReducerCard.updateCard:
// 			return {
// 				...state,
// 				updateCard: (action as TypeActionUpdateCard).payload,
// 			}
// 		default:
// 			return state;
// 	}
// }