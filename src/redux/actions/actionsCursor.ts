import { TypeReducerCursor } from '../types/typesCursor'

const setCursorClientX = (res: number) => {
	return {
		type: TypeReducerCursor.setClientX,
		payload: res,
	}
}

const setCursorClientY = (res: number) => {
	return {
		type: TypeReducerCursor.setClientY,
		payload: res,
	}
}

export {
	setCursorClientX,
	setCursorClientY,
}