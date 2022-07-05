export type TypeCursor = {
	clientX: number | undefined;
	clientY: number | undefined;
}

export enum TypeReducerCursor {
	setClientX = "SET_CLIENT_X",
	setClientY = "SET_CLIENT_Y",
}

export type TypeActionCursor = {
	type: TypeReducerCursor,
	payload: number,
}