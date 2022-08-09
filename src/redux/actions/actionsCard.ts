import { createAction } from '@reduxjs/toolkit';
import { TypeReducerCard, PrevCard } from '../types/typeCard';

// export const setPrevCard = (res: PrevCard) => {
// 	return {
// 		type : TypeReducerCard.setPrevCard,
// 		payload: res,
// 	}
// }

// export const updateCardF = (res: string | null) => {
// 	return {
// 		type: TypeReducerCard.updateCard,
// 		payload: res,
// 	}
// }

export const updateCardF = 
	createAction(TypeReducerCard.updateCard, (payload: string | null) => {
	return {
		payload,
	}
});
export const setPrevCard = 
	createAction(TypeReducerCard.setPrevCard, (payload: PrevCard) => {
	return {
		payload,
	}
});