import { createAction } from '@reduxjs/toolkit'
import { TypeReducerCursor } from '../types/typesCursor'

// const setCursorClientX = (res: number) => {
// 	return {
// 		type: TypeReducerCursor.setClientX,
// 		payload: res,
// 	}
// }

// const setCursorClientY = (res: number) => {
// 	return {
// 		type: TypeReducerCursor.setClientY,
// 		payload: res,
// 	}
// }

// export {
// 	setCursorClientX,
// 	setCursorClientY,
// }

export const setCursorClientX = createAction(TypeReducerCursor.setClientX, (payload: number) => {
	return {payload};
});
export const setClientY = createAction(TypeReducerCursor.setClientY, (payload) => {
	return {payload};
});