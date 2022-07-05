import { TypeReducerCard, TypeCard } from '../types/typeCard';

export const setPrevCard = (res: TypeCard) => {
	return {
		type : TypeReducerCard.setPrevCard,
		payload: res,
	}
}

export const setNextCard = (res: TypeCard) => {
	return {
		type: TypeReducerCard.setNextCard,
		payload: res,
	}
}

export const updateCardF = (res: TypeCard) => {
	return {
		type: TypeReducerCard.updateCard,
		payload: res,
	}
}