import { TypeBordList } from '../../data/dataCell'
import { TypeReducerBorb } from '../types/typesBord'

const setDataBord = (res: TypeBordList) => {
	return {
		type: TypeReducerBorb.setData,
		payload: res,
	}
}

export {
	setDataBord,
}