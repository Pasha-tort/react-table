import React, { FC, useEffect, useRef } from 'react';

//components
import { CellList } from './CellList';

//libs
import { useDrag, useDrop } from 'react-dnd';

//styles
import style from './cell.module.scss';

//types
import { TypeCell } from '../../data/dataCell';
type PropsDataCell = {
	dataCell: TypeCell,
}

export const CellMemo: FC<PropsDataCell> = ({ dataCell }) => {
	
	const refCell = useRef<HTMLLIElement>(null!);

	const handlerMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
		refCell.current.classList.add(style.cell_hover);
	}
	const handlerMouseOut = (e: React.MouseEvent<HTMLLIElement>) => {
		refCell.current.classList.remove(style.cell_hover);
	}

	// console.log(dataCell.list)
	useEffect(() => {	
	}, [dataCell.list.length])
	
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

export const Cell = React.memo(CellMemo)