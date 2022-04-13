import React, { FC, useRef } from 'react';

//components
import { CellList } from './CellList';

//styles
import style from './cell.module.scss';

export const Cell: FC = () => {

	const refCell = useRef<HTMLLIElement>(null!)

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
			>cell title</span>
			<CellList cards={[1, 2, 3]} />
		</li >
	)
}