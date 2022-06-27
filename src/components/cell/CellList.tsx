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
	prevPosition: 'top' | 'bottom' | 'never';
	el: HTMLElement;
	numberList: number;
}

export const CellList: FC<PropsCellList> = ({ cards, id }) => {

	const [background, setBackground] = useState<string>('');
	const [lineState, setLine] = useState<DataLine>(null!);

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

	const searchParent = (node: HTMLElement, searchSelector: string, selectorValue: string): HTMLElement | Function => {
		if (node.dataset && node.dataset[searchSelector] === 'true') return node;
		else return searchParent(node, searchSelector, selectorValue);
	}

	const handlerDragOver = (e: React.DragEvent, numberList: number) => {
		const x = e.clientX;
		const y = e.clientY;
		const el = e.target as HTMLElement;
		const parent = searchParent(el.parentElement!, 'card', 'true') as HTMLElement;
		const coordEl = parent.getBoundingClientRect();

		if (y > Math.ceil(coordEl.top - (coordEl.height / 2))) {

			setLine({
				position: 'top',
				el: parent,
				numberList,
			});
			if (lineState.prevPosition !== lineState)
				parent.previousElementSibling?.classList.add(styleLine.line_active);
		} else {
			parent.nextElementSibling?.classList.add(styleLine.line_active);
			// setLine({
			// 	position: 'bottom',
			// 	el: parent,
			// 	numberList,
			// });
		}
	}

	const handlerDragEnter = () => {
		if (!cards.length) setBackground(style.cell__list_hovered);
	}
	const handlerDragLeave = () => {
		setLine(null!);
		if (!cards.length) setBackground('');
	}

	return (
		<div className={style.cell__wrapper}>
			<ul
				ref={drop}
				onDragEnter={handlerDragEnter}
				onDragLeave={handlerDragLeave}
				className={`${style.cell__list} ${background}`}
			>
				{
					cards.map((card, i) => {
						const cardView = <Card
							dataCard={card}
							numberList={i}
							idCell={id}
							key={card.id}
							handlerDragOver={handlerDragOver}
						/>
						if (i === 0)
							return <>
								{Line}
								{cardView}
								{Line}
							</>
						else {
							return <>
								{cardView}
								{Line}
							</>
						}
					})
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>
	)
}