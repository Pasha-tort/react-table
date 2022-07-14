export type StateModal = {
	openModalMini: StateModalMini;
	openModal: boolean;
}

export type StateModalMini = {
	idCell: string | null;
	state: boolean;
}

export enum TypeReducerModal {
	openModalMini = "SET_OPEN_MODEL_MINI",
	openModal = "SET_OPEN_MODEL",
}

export type TypeActionModal = {
	type: TypeReducerModal,
	payload: boolean,
}
export type ActionModalMini = {
	type: TypeReducerModal,
	payload: StateModalMini,
}