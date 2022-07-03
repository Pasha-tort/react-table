import React, { DOMElement, FC, useEffect } from 'react';

//libs
import { useDrop } from 'react-dnd';

//componetns
import { Card } from '../card';
import { Line } from '../card/Line';

//styles
import style from './cell.module.scss';
import styleLine from '../card/Line/line.module.scss';

//types
import { TypeCard } from '../../data/dataCell';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { R } from '../../redux/reducers';
// import { TypeDataItmeConfig } from '../card/Card';
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

export const CellList: FC<PropsCellList> = ({ cards, id }) => {

	const [background, setBackground] = useState<string>('');
	const { updateCard } = useSelector((r: R) => r.reducerCard);

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
	}));

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
				// onDragOver={handlerDragOver}
				className={`${style.cell__list} ${background}`}
			>
				{
					cards.map((card, i) => {
						return <Card
							dataCard={card}
							numberList={i}
							idCell={id}
							key={card.id}
							updateCard={updateCard!}
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