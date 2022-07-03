export type TypeCard = {
	prevCard?: {
		el: HTMLElement;
		id: number;
	} | null;
	nextCard?: {
		el: HTMLElement;
		id: number;
	} | null;
	updateCard?: number | null;
}

export enum TypeReducerCard {
	setPrevCard = 'SET_PREV_CARD',
	setNextCard = 'SET_NEXT_CARD',
	updateCard = 'UPDATE_CARD',
}

export type TypeActionCard = {
	type: TypeReducerCard,
	payload: TypeCard | null,
}