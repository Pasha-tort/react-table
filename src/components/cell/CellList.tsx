import React, { FC } from 'react';

//libs
import { v4 as uuid } from 'uuid'
import { useDrop, ConnectDropTarget } from 'react-dnd';

//componetns
import { Card } from '../card';

//styles
import style from './cell.module.scss';

//utils

//types
import { TypeCard } from '../../data/dataCell';
type PropsCellList = {
	cards: TypeCard[],
	id: number,
}

export const CellList: FC<PropsCellList> = ({ cards, id }) => {

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item, monitor) => {
			return {
				idFinalCell: id,
				...item as {},
			};
		},
		// hover: (item, monitor) => {
		// 	console.log(monitor.getItem())
		// },
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	}));

	return (
		<div ref={drop} className={style.cell__wrapper}>
			<ul className={style.cell__list}>
				{
					cards.map(card => {
						return <Card dataCard={card} idCell={id} key={uuid()} />
					})
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>

	)
}