import { TypeReducerCard, PrevCard } from '../types/typeCard';

export const setPrevCard = (res: PrevCard) => {
	return {
		type : TypeReducerCard.setPrevCard,
		payload: res,
	}
}

// export const setNextCard = (res: TypeCard) => {
// 	return {
// 		type: TypeReducerCard.setNextCard,
// 		payload: res,
// 	}
// }

export const updateCardF = (res: number) => {
	return {
		type: TypeReducerCard.updateCard,
		payload: res,
	}
}