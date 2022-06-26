import React, { FC, useEffect, useRef } from 'react';

//components
import { CellList } from './CellList';

//styles
import style from './cell.module.scss';

//types
import { TypeCell } from '../../data/dataCell';
type PropsDataCell = {
	dataCell: TypeCell,
}

export const Cell: FC<PropsDataCell> = ({ dataCell }) => {

	// const refCell = useRef<HTMLLIElement>(null!);

	// const handlerMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
	// 	refCell.current.classList.add(style.cell_hover);
	// }
	// const handlerMouseOut = (e: React.MouseEvent<HTMLLIElement>) => {
	// 	refCell.current.classList.remove(style.cell_hover);
	// }

	return (
		<li className={style.cell}>
			<span
				className={style.cell__title}
			>
				{dataCell.title}
			</span>
			<CellList cards={dataCell.list} id={dataCell.id} />
		</li >
	)
}

// export const Cell = React.memo(CellMemo, (prev, next) => {
// 	if (prev.dataCell.list.length !== next.dataCell.list.length) return false;
// 	let result = true;
// 	let c = 0;
// 	while (c < next.dataCell.list.length) {
// 		if (prev.dataCell.list[c].id !== next.dataCell.list[c].id) {
// 			result = false;
// 			break;
// 		}
// 		c++;
// 	}
// 	return result;
// })

