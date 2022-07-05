import { 
  TypeCard, 
  TypeActionPrevCard, 
  TypeActionUpdateCard, 
  TypeReducerCard,
  TypeActionCard,
} from '../types/typeCard';

const initialState = {
	prevCard: null,
	// nextCard: null,
	updateCard: 0,
};

export const reducerCard = (state: TypeCard = initialState, action: TypeActionCard) => {
	switch(action.type) {
		case TypeReducerCard.setPrevCard:
			return {
				...state,
				prevCard: (action as TypeActionPrevCard).payload,
			}
		// case TypeReducerCard.setNextCard:
		// 	return {
		// 		...state,
		// 		nextCard: action.payload?.nextCard,
		// 	}
		case TypeReducerCard.updateCard:
			return {
				...state,
				updateCard: (action as TypeActionUpdateCard).payload,
			}
		default:
			return state;
	}
}