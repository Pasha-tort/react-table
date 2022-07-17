import React from 'react';

export type StateModal = {
	openModal: boolean;
	children: React.ReactNode;
}

export enum TypeReducerModal {
	openModal = "SET_OPEN_MODEL",
}

export type TypeActionModal = {
	type: TypeReducerModal,
	payload: React.ReactNode,
}