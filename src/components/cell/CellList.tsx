import React, { FC, useCallback, useEffect, useState } from 'react';

//libs
import { v4 as uuid } from 'uuid'
import { useDrop, ConnectDropTarget } from 'react-dnd';

//componetns
import { Card } from '../card';

//styles
import style from './cell.module.scss';

//types
import { TypeCard } from '../../data/dataCell';
type PropsCellList = {
	cards: TypeCard[],
	id: number,
}

export const CellListMemo: FC<PropsCellList> = ({ cards, id }) => {

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item, monitor) => {
			return {
				idFinalCell: id,
				...item as {},
			};
		},
		hover: (item, monitor) => {
			// console.log(item)
		},
		collect: (monitor) => ({
			isOver: monitor.isOver()
		})
	}), [cards, id]);

	useEffect(() => {

	}, [cards, id]);

	return (
		<div className={style.cell__wrapper}>
			<ul ref={drop} className={style.cell__list}>
				{
					cards.map((card, i) => {
						return <Card dataCard={card} idCell={id} key={i} />
					})
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>

	)
}

export const CellList = React.memo(CellListMemo);