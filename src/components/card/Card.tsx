import React, { FC, useEffect, useRef, useState } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//components
import { CardView } from './CardView';
import {CardPreview} from './CardPreview';
import { DragPreviewComponent } from '../dragPreview';

//img
import tort from './img/tort.jpg';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//libs
import { useDrag, useDragLayer, DragSourceMonitor, DragPreviewImage } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { isDataView } from 'util/types';

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
	}), []);

	const { sourceClientOffset, itemSource, clientOffset } = useDragLayer(monitor => {
		return {
			clientOffset: monitor.getClientOffset(),
			initialOffsetDomEl: monitor.getInitialSourceClientOffset(),
			differenceOffset: monitor.getDifferenceFromInitialOffset(),
			sourceClientOffset: monitor.getSourceClientOffset(),
			itemSource: monitor.getItem(),
		};
	});

	useEffect(() => {
	}, []);
	console.log('render', dataCard.id)
	return (
		<>
			<CardView
				wrapperRef={wrapperRef}
				anchorRef={drag}
				styles={`${style.card} ${collected.isDragging ? style.card__dragging : style.card__nodrag}`}
				dataCard={dataCard}
			/>
			<DragPreviewImage src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'} connect={preview} />
			{
				!collected.isDragging ? null
				:
				<>
					<CardPreview
						anchorRef={preview}
						styles={`${style.card} ${collected.isDragging ? style.card__preview_active : style.card__preview}`}
						dataCard={dataCard}
						styleInline={{ top: clientOffset!.y + 20, left: sourceClientOffset?.x, width: wrapperRef.current ? wrapperRef.current.getBoundingClientRect().width : undefined}}
					/>
				</>
			}
		</>
	)
}