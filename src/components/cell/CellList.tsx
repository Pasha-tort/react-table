import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

//libs
import { useDrop } from 'react-dnd';
import { v4 as uuid } from 'uuid';

//components
import { Card } from '../card';

//actions
// import { setDataBord } from '../../redux/actions/actionsBord';
import { setDataBord } from '../../redux/reducers/sliceBord';

//data
import { addCard } from "../../data/dataCell";

//styles
import style from './cell.module.scss';

//types
import { TypeCard } from '../../data/dataCell';
import { useState } from 'react';
import { getRequest } from '../../hooks/useFetch';
type PropsCellList = {
	cards: TypeCard[],
	id: string,
	numberCell: number;
}
type DataOfHover = {
	idSrcCard: string,
	idSrcCell: string,
}

export const CellList: FC<PropsCellList> = ({ cards, id, numberCell }) => {

	const [background, setBackground] = useState<string>('');
	const cardsListRef = useRef<HTMLUListElement>(null!);
	const dispatch = useDispatch();

	// eslint-disable-next-line
	const [{ }, drop] = useDrop(() => ({
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
		if (cards.length) setBackground('');
	}, [cards]);

	const handlerDragEnter = () => {
		if (!cards.length) setBackground(style.cell__list_hovered);
	}
	const handlerDragLeave = () => {
		if (!cards.length) setBackground('');
	}

	const handlerAddCard = async () => {
		// const data = addCard({
		// 	id: uuid(),
		// 	title: "",
		// 	desc: "",
		// }, numberCell);
		const { request } = getRequest();
		const { items } = await request(
			"/addCard",
			"POST",
			JSON.stringify({
				dataCard: {
					id: uuid(),
					title: "",
					desc: "",
				},
				numberCell,
			})
		)
		dispatch(setDataBord(items));
	}

	return (
		<div className={style.cell__wrapperList}>
			<ul
				onDragEnter={handlerDragEnter}
				onDragLeave={handlerDragLeave}
				ref={(r) => {
					drop(r);
					cardsListRef.current = r!;
				}}
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
			<button
				onClick={handlerAddCard}
				className={style.cell__btn}
			>
				+
			</button>
		</div>
	)
}