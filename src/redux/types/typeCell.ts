export type TypeCell = {
	prevCell: PrevCell | null;
	updateCell: string | null;
}

export type PrevCell = {
	el: HTMLElement;
	id: string;
	numberCellDrop: number;
	positionDrop: PositionDrop;
}
export type PositionDrop = "before" | "after" | "noDrag";
export enum TypeReducerCell {
	setPrevCell = "SET_PREV_CELL",
	updateCard = "UPDATE_CARD",
}

export type TypeActionPrevCell = {
	type: TypeReducerCell,
	payload: PrevCell,
}
export type TypeActionUpdateCell = {
	type: TypeReducerCell,
	payload: string;
}
export type TypeActionCell = TypeActionPrevCell | TypeActionUpdateCell;