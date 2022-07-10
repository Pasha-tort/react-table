import React, { FC, useEffect, useState, useRef } from 'react';
import { changeDataCard, TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';
import { setPrevCard, updateCardF } from '../../redux/actions/actionsCard';

//lib
import { searchParent } from '../../lib/type';

//libs
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

//types
import { R } from '../../redux/reducers';
import { PositionDrop } from '../../redux/types/typeCard';
type PropsCard = {
	dataCard: TypeCard,
	idCell: number,
	numberList: number;
}
type TypeDataEndDragging = {
	idFinalCell: number,
	idSrcCard: number,
	idSrcCell: number,
}

export const CardMemo: FC<PropsCard> = ({ dataCard, idCell, numberList }) => {
	const dispatch = useDispatch();
	const cardRef = useRef<HTMLElement>(null!);
	const [positionDrop, setPositionDrop] = useState<PositionDrop>('noDrag');

	const { prevCard, updateCard } = useSelector((r: R) => r.reducerCard);

	const [{ isDragging, typeDragEll }, drag] = useDrag(() => ({
		type: 'card',
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
			dispatch(updateCardF(prevCard!.id));
			const { numberCardDrop, positionDrop } = prevCard!;
			const { idSrcCell, idSrcCard, idFinalCell } = monitor.getDropResult() as TypeDataEndDragging;
			const data = changeDataCard(idSrcCell, idSrcCard, idFinalCell, numberCardDrop!, positionDrop);
			setPositionDrop('noDrag');
			dispatch(setDataBord(data));
		},
		item: {
			idSrcCard: dataCard.id,
			idSrcCell: idCell,
		},
		options: {
			dropEffect: 'move',
		},
		isDragging: (monitor) => {
			return monitor.getItem().idSrcCard === dataCard.id
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			typeDragEll: monitor.getItemType(),
		})
	}), [prevCard, numberList]);

	const handlerDragOver = (e: React.DragEvent) => {
		if (typeDragEll !== 'card') return;
		const y = e.clientY;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, cardRef.current) as HTMLElement;
		if (prevCard && parent !== prevCard.el)
			dispatch(updateCardF(prevCard.id));

		const coordEl = parent.getBoundingClientRect();
		if (y < Math.ceil(coordEl.top + (coordEl.height / 2))) {
			if (positionDrop === 'before' && prevCard && parent === prevCard.el) return;
			else {
				setPositionDrop('before');
				dispatch(setPrevCard({
					el: parent,
					id: dataCard.id,
					numberCardDrop: numberList,
					positionDrop: 'before',
				}));
			}
		} else {
			if (positionDrop === 'after' && prevCard && parent === prevCard.el) return;
			else {
				setPositionDrop('after');
				dispatch(setPrevCard({
					el: parent,
					id: dataCard.id,
					numberCardDrop: numberList,
					positionDrop: 'after',
				}));
			}
		}
	}

	useEffect(() => {
		if (updateCard === dataCard.id && positionDrop !== 'noDrag') {
			setPositionDrop('noDrag');
		}
	}, [
		updateCard,
		dataCard.id,
		positionDrop,
		numberList
	]);

	return (
		<li
			className={`
				${style.card}
				${positionDrop === 'before' ?
					style.card__topline : positionDrop === 'after' ?
						style.card__bottomline : ''
				}
			`}
			ref={(r) => {
				drag(r);
				cardRef.current = r!;
			}}
			onDragOver={(e) => handlerDragOver(e)}
		>
			<div style={isDragging ? { opacity: 0.5 } : {}}
				className={`
					${style.card__wrapper} 
					${isDragging ? style.card__wrapper_dragging : ''}
				`}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
				<span className={style.card__desc}>{dataCard.id}</span>
			</div>
		</li>
	)
}

export const Card = React.memo(CardMemo, (prev, next) => {
	// false - обновляем (нюанс react.memo)
	if (prev.numberList === next.numberList && prev.idCell === next.idCell)
		return true
	return false
})