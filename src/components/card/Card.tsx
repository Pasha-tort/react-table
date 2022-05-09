import React, { FC, useEffect, useState } from 'react';
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

type TypeCoordinate = {
	x: number;
	y: number;
}

export const Card: FC<PropsCard> = ({ dataCard, idCell }) => {

	const [cordX, setCordX] = useState(0);
	const [cordY, setCordY] = useState(0);
	const dispatch = useDispatch();

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

	const handlerMouseMoveDrag = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!collected.isDragging) return null;
		console.log(e.pageX, e.pageY)
		setCordX(e.pageX);
		setCordY(e.pageY);
	}

	const handlerMouseMoveNoDrag = (e: React.MouseEvent<HTMLLIElement>) => {
		if (collected.isDragging) return null;
		setCordX(e.pageX);
		setCordY(e.pageY);
	}

	return (
		<>
			{/* <CardView
				refAnchor={drag}
				styles={`${style.card} ${collected.isDragging ? style.card__dragging_active : style.card__dragging}`}
				dataCard={dataCard}
			/>
			<CardView
				refAnchor={preview}
				styles={`${style.card} ${collected.isDragging ? style.card__preview_active : style.card__preview}`}
				dataCard={dataCard}
			/> */}
			{/* <CardView ref={preview} dataCard={dataCard} styles={`${style.card}`} /> */}

			{/* <DragPreviewComponent isDragging={collected.isDragging}>
				<div ref={preview}
					className={`${style.card} ${collected.isDragging ? style.card__preview_active : style.card__preview}`}
					style={{ top: cordY, left: cordX }}
					onMouseMove={handlerMouseMoveDrag}
				>
					<span className={style.card__title}>{dataCard.title}</span>
					<span className={style.card__desc}>{dataCard.desc}</span>
				</div>
			</DragPreviewComponent> */}
			<li
				ref={drag}
				onMouseMove={handlerMouseMoveNoDrag}
				className={`${style.card} ${collected.isDragging ? style.card__dragging : ''}`}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
			</li>
		</>
	)
}

const CardDragLayer = () => {
	const {
		itemType,
		isDragging,
		initialCursorOffset,
		initialFileOffset,
		currentFileOffset,
	} = useDragLayer((monitor) => ({
		item: monitor.getItem(),
		itemType: monitor.getItemType(),
		initialCursorOffset: monitor.getInitialClientOffset(),
		initialFileOffset: monitor.getInitialSourceClientOffset(),
		currentFileOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}));

	console.log(itemType,
		isDragging,
		initialCursorOffset,
		initialFileOffset,
		currentFileOffset)

	if (!isDragging) {
		return null;
	}

	return (
		<li
			// ref={dragPreview}
			className={`${style.card} ${style.card__preview}`}
		>
			{/* <span className={style.card__title}>{dataCard.title}</span>
			<span className={style.card__desc}>{dataCard.desc}</span> */}
		</li>
	)
}