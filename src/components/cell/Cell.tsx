import React, { FC, useEffect } from 'react';

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
	useEffect(() => {
	}, [dataCell.list.length])

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

