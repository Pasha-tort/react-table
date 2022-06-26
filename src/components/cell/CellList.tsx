import React, { FC, useEffect } from 'react';

//libs
import { useDrop } from 'react-dnd';

//componetns
import { Card } from '../card';

//styles
import style from './cell.module.scss';

//types
import { TypeCard } from '../../data/dataCell';
import { useState } from 'react';
// import { TypeDataItmeConfig } from '../card/Card';
type PropsCellList = {
	cards: TypeCard[],
	id: number,
}

export const CellList: FC<PropsCellList> = ({ cards, id }) => {

	const [background, setBackground] = useState('');

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item: {}, monitor) => {
			return {
				...item,
				idFinalCell: id,
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		})
	}));

	useEffect(() => {
		if (cards.length) setBackground('')
	}, [cards])

	const handlerDragEnter = () => {
		if (!cards.length) setBackground(style.cell__list_hovered)
	}

	return (
		<div className={style.cell__wrapper}>
			<ul ref={drop} onDragEnter={handlerDragEnter} className={`${style.cell__list} ${background}`}>
				{
					cards.map((card, i) => {
						return <Card dataCard={card} numberList={i} idCell={id} key={card.id} />
					})
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>
	)
}