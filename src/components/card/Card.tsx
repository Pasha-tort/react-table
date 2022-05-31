import React, { FC, useEffect, useRef, useState } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';
import { DragPreviewImage } from 'react-dnd';

//components
import { CardView } from './CardView';
import { DragPreviewComponent } from '../dragPreview';

//img
import onePx from '../../img/1px.png';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//libs
import { useDrag, useDragLayer } from 'react-dnd';
import { useDispatch } from 'react-redux';

//types
type PropsCard = {
	dataCard: TypeCard,
	idCell: number,
}

type TypeDataEndDragging = {
	idFinalCell: number,
	idSrcCard: number,
	idSrcCell: number,
}

export const Card: FC<PropsCard> = ({ dataCard, idCell }) => {

	const dispatch = useDispatch();
	const wrapperRef = useRef<HTMLDivElement>(null!);

	const [collected, drag, preview] = useDrag(() => ({
		type: 'card',
		item: { idSrcCard: dataCard.id, idSrcCell: idCell, },
		end: (item, monitor) => {
			if (!monitor.getDropResult()) return;
			const { idFinalCell, idSrcCard, idSrcCell } = monitor.getDropResult() as TypeDataEndDragging;
			const data = changeData(idSrcCell, idSrcCard, idFinalCell);
			dispatch(setDataBord(data));
		},
		options: {
			dropEffect: 'move',
		},
		isDragging: (monitor) => {
			return monitor.getItem().idSrcCard === dataCard.id
		},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
			getDropResult: !!monitor.getDropResult(),
		})
	}));

	const { sourceClientOffset } = useDragLayer(monitor => {
		return {
			clientOffset: monitor.getClientOffset(),
			initialOffsetDomEl: monitor.getInitialSourceClientOffset(),
			differenceOffset: monitor.getDifferenceFromInitialOffset(),
			sourceClientOffset: monitor.getSourceClientOffset(),
		};
	});

	useEffect(() => {

	}, [dataCard, idCell]);

	console.log(preview)
	return (
		<>
			<CardView
				type="card"
				wrapperRef={wrapperRef}
				ref={drag}
				styles={`${style.card} ${collected.isDragging ? style.card__dragging : ''}`}
				dataCard={dataCard}
			/>
			{/* <DragPreviewComponent data={dataCard} styles={style.card + ' ' + style.card__preview} /> */}
			{/* {
				!collected.isDragging ? null : */}
			{/* <DragPreviewComponent isDragging={collected.isDragging}> */}
			{/* <DragPreviewImage connect={preview} src={onePx} /> */}

			<CardView
				type="preview"
				ref={preview}
				styles={`${style.card} ${collected.isDragging ? style.card__preview_active : style.card__preview}`}
				dataCard={dataCard}
				styleInline={{
					width: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().width + 'px' : undefined,
				}}
				coordinate={{
					left: sourceClientOffset?.x + 'px',
					top: sourceClientOffset?.y + 'px',
				}}
			/>
			{/* </DragPreviewComponent> */}

		</>
	)
}