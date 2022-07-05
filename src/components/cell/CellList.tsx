import React, { DOMElement, FC, useEffect } from 'react';

//libs
import { useDrop } from 'react-dnd';

//components
import { Card } from '../card';
import { Line } from '../card/Line';

//styles
import style from './cell.module.scss';
import styleLine from '../card/Line/line.module.scss';

//types
import { data, TypeCard } from '../../data/dataCell';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { R } from '../../redux/reducers';
// import { TypeDataItemConfig } from '../card/Card';
type PropsCellList = {
	cards: TypeCard[],
	id: number,
}
type DataOfHover = {
	idSrcCard: number,
	idSrcCell: number,
}
type DataLine = {
	position: 'top' | 'bottom' | 'never';
	el: HTMLElement;
	numberList: number;
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
		<div className={style.cell__wrapper}>
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
						// if (i === 0) {
						// 	return <>
						// 		<Line key={'line' + card.id + "first"} />
						// 		<Card
						// 			dataCard={card}
						// 			numberList={i}
						// 			idCell={id}
						// 			key={card.id}
						// 		/>
						// 		<Line key={'line' + card.id} />
						// 	</>
						// } else {
						// 	<>
						// 		<Card
						// 			dataCard={card}
						// 			numberList={i}
						// 			idCell={id}
						// 			key={card.id}
						// 		/>
						// 		<Line key={'line' + card} />
						// 	</>
						// }
					}
					)
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>
	)
}

export const CellList = React.memo(CellListMemo);