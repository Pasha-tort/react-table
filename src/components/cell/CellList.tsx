import React, { FC, useEffect } from 'react';

//libs
import { useDrop } from 'react-dnd';

//components
import { Card } from '../card';

//styles
import style from './cell.module.scss';

//types
import { TypeCard } from '../../data/dataCell';
import { useState } from 'react';
type PropsCellList = {
	cards: TypeCard[],
	id: number,
}
type DataOfHover = {
	idSrcCard: number,
	idSrcCell: number,
}

export const CellListMemo: FC<PropsCellList> = ({ cards, id }) => {

	const [background, setBackground] = useState<string>('');

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'card',
		drop: (item: DataOfHover, monitor) => {
			return {
				...item,
				idFinalCell: id,
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		})
	}), [cards.length]);

	useEffect(() => {

	}, [cards.length]);

	useEffect(() => {
		if (cards.length) setBackground('')
	}, [cards]);

	const handlerDragEnter = () => {
		if (!cards.length) setBackground(style.cell__list_hovered);
	}
	const handlerDragLeave = () => {
		if (!cards.length) setBackground('');
	}

	return (
		<div className={style.cell__wrapperList}>
			<ul
				onDragEnter={handlerDragEnter}
				onDragLeave={handlerDragLeave}
				ref={drop}
				className={`${style.cell__list} ${background}`}
			>
				{
					cards.map((card, i) => {
						return <Card
							dataCard={card}
							numberList={i}
							idCell={id}
							key={card.id}
						/>
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