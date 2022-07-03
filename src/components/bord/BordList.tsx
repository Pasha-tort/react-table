import React, { FC } from 'react';
import { useSelector } from 'react-redux';

//libs
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Components
import { Cell } from '../cell';

//styles
import style from './bord.module.scss';

//actions
import { R } from '../../redux/reducers';

export const BordList: FC = () => {

	const { data } = useSelector((state: R) => state.reducerBord);


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
