import { TypeReducerCard, PrevCard } from '../types/typeCard';

export const setPrevCard = (res: PrevCard) => {
	return {
		type : TypeReducerCard.setPrevCard,
		payload: res,
	}
}

export const updateCardF = (res: string | null) => {
	return {
		type: TypeReducerCard.updateCard,
		payload: res,
	}
}