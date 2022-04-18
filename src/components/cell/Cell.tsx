import React, { FC, useRef } from 'react';

//components
import { CellList } from './CellList';

//libs
import { useDrag, useDrop } from 'react-dnd';

//styles
import style from './cell.module.scss';

//types
import { TypeCell } from '../../data/dataCell';
import { idText } from 'typescript';
type PropsDataCell = {
	dataCell: TypeCell,
}

export const Cell: FC<PropsDataCell> = ({ dataCell }) => {

	const refCell = useRef<HTMLLIElement>(null!);

	const handlerMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
		refCell.current.classList.add(style.cell_hover);
	}
	const handlerMouseOut = (e: React.MouseEvent<HTMLLIElement>) => {
		refCell.current.classList.remove(style.cell_hover);
	}

	return (
		<li ref={refCell} className={style.cell}>
			<span
				className={style.cell__title}
				onMouseEnter={handlerMouseEnter}
				onMouseOut={handlerMouseOut}
			>{dataCell.title}</span>
			<CellList cards={dataCell.list} id={dataCell.id} />
		</li >
	)
}