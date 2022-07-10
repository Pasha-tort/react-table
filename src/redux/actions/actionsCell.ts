import { TypeReducerCell, PrevCell } from '../types/typeCell';

export const setPrevCell = (res: PrevCell) => {
	return {
		type: TypeReducerCell.setPrevCell,
		payload: res,
	}
}

export const updateCellF = (res: number) => {
	return {
		type: TypeReducerCell.updateCard,
		payload: res,
	}
}