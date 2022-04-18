import React, { FC, useEffect } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//libs
import { useDrag, useDragLayer } from 'react-dnd';
import { useDispatch } from 'react-redux';

//types
import { R } from '../../redux/reducers';
import { getEmptyImage } from 'react-dnd-html5-backend';
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

	const [collected, drag, dragPreview] = useDrag(() => ({
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
	}), [dataCard, idCell]);

	return (
		<>
			<li
				ref={drag}
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