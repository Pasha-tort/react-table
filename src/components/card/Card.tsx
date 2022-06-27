import React, { FC, useEffect, useState, useRef } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//libs
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

//types
type PropsCard = {
	dataCard: TypeCard,
	idCell: number,
	numberList: number;
	handlerDragOver: (e: React.DragEvent, numberList: number) => void;
}

type TypeDataEndDragging = {
	idFinalCell: number,
	idSrcCard: number,
	idSrcCell: number,
}

export const CardMemo: FC<PropsCard> = ({ dataCard, idCell, handlerDragOver, numberList }) => {
	const dispatch = useDispatch();
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
			const { idSrcCell, idSrcCard, idFinalCell } = monitor.getDropResult() as TypeDataEndDragging;
			const data = changeData(idSrcCell, idSrcCard, idFinalCell);
			dispatch(setDataBord(data));
		},
		item: {
			idSrcCard: dataCard.id,
			idSrcCell: idCell
		},
		options: {
			dropEffect: 'move',
		},
		isDragging: (monitor) => {
			return monitor.getItem().idSrcCard === dataCard.id
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	}));

	return (
		<li
			className={`${style.card} ${isDragging ? style.card__dragging : ''}`}
			id={dataCard.id.toString()}
			ref={drag}
			onDragOver={(e) => handlerDragOver(e, numberList)}
			data-card='true'
		>
			<span className={style.card__title}>{dataCard.title}</span>
			<span className={style.card__desc}>{dataCard.desc}</span>
			<span className={style.card__desc}>{dataCard.id}</span>
		</li>
	)
}

export const Card = React.memo(CardMemo, (prev, next) => {
	if (prev.numberList === next.numberList && prev.idCell === next.idCell)
		return true
	return false
})