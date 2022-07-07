export type TypeCell = {
	prevCell: PrevCell | null;
	updateCell: number;
}

export type PrevCell = {
	el: HTMLElement;
	id: number;
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
	payload: number;
}
export type TypeActionCell = TypeActionPrevCell | TypeActionUpdateCell;