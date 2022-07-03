import { TypeCard, TypeActionCard, TypeReducerCard } from '../types/typeCard';

const initialState = {
	prevCard: null,
	nextCard: null,
	updateCard: null,
};

export const reducerCard = (state: TypeCard = initialState, action: TypeActionCard) => {
	switch(action.type) {
		case TypeReducerCard.setPrevCard:
			return {
				...state,
				prevCard: action.payload?.prevCard,
			}
		case TypeReducerCard.setNextCard:
			return {
				...state,
				nextCard: action.payload?.nextCard,
			}
		case TypeReducerCard.updateCard:
			return {
				...state,
				updateCard: action.payload as number,
			}
		default:
			return state;
	}
}