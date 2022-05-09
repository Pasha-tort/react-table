import React, { FC, useEffect, useRef, useState } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//components
import { CardView } from './CardView';
import { DragPreviewComponent } from '../dragPreview';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//libs
import { useDrag, useDragLayer, DragSourceMonitor } from 'react-dnd';
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
	const wrapperRef = useRef<HTMLLIElement>(null!);

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
	}), []);

	const { sourceClientOffset } = useDragLayer(monitor => {
		return {
			clientOffset: monitor.getClientOffset(),
			initialOffsetDomEl: monitor.getInitialSourceClientOffset(),
			differenceOffset: monitor.getDifferenceFromInitialOffset(),
			sourceClientOffset: monitor.getSourceClientOffset(),
		};
	});

	useEffect(() => {

	}, [sourceClientOffset]);

	return (
		<>
			<CardView
				// ref={wrapperRef}
				refAnchor={drag}
				styles={`${style.card} ${collected.isDragging ? style.card__dragging : ''}`}
				dataCard={dataCard}
			/>
			<CardView
				refAnchor={preview}
				styles={`${style.card} ${collected.isDragging ? style.card__preview_active : style.card__preview}`}
				dataCard={dataCard}
				styleInline={{ top: sourceClientOffset?.y, left: sourceClientOffset?.x, width: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().width : undefined }}
			/>
		</>
	)
}