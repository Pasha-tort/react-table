export type TypeCard = {
	prevCard: PrevCard | null;
	updateCard: string | null;
}

export type PrevCard = {
  	el: HTMLElement;
  	id: string;
  	numberCardDrop: number | null;
	positionDrop: PositionDrop;
}
export type PositionDrop = 'before' | 'after' | 'noDrag';
export enum TypeReducerCard {
	setPrevCard = 'SET_PREV_CARD',
	setNextCard = 'SET_NEXT_CARD',
	updateCard = 'UPDATE_CARD',
}

export type TypeActionPrevCard = {
	type: TypeReducerCard,
	payload: PrevCard,
}
export type TypeActionUpdateCard = {
  type : TypeReducerCard,
  payload: string;
}
export type TypeActionCard = TypeActionPrevCard | TypeActionUpdateCard;