import React, { FC, useState } from 'react';

//libs
import { v4 as uuid } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Components
import { Cell } from '../cell';

//styles
import style from './bord.module.scss';
import { TypeBordList } from '../../data/dataCell';

//actions
import { setCursorClientX, setCursorClientY } from '../../redux/actions/actionsCursor';
import { useDispatch } from 'react-redux';

//types
type PropsCellList = {
	data: TypeBordList,
}

export const BordList: FC<PropsCellList> = ({ data }) => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={style.bord__wrapper}>
				<ul className={style.bord__list}>
					{
						data.map(cell => {
							return <Cell dataCell={cell} key={cell.id} />
						})
					}
				</ul>
				<button className={style.bord__btn}>
					+
				</button>
			</div>
		</DndProvider>

	)
}
