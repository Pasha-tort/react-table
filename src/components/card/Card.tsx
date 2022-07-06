import React, { FC, useEffect, useState, useRef } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';
import { setPrevCard, updateCardF } from '../../redux/actions/actionsCard';

//libs
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

//types
import { R } from '../../redux/reducers';
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
type PositionDrag = 'before' | 'after' | 'noDrag';

export const CardMemo: FC<PropsCard> = ({ dataCard, idCell }) => {
	const dispatch = useDispatch();
	const cardRef = useRef<HTMLElement>(null!);
	const [positionDrag, setPositionDrag] = useState<PositionDrag>('noDrag');

	const { prevCard, updateCard } = useSelector((r: R) => r.reducerCard);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
			dispatch(updateCardF(prevCard!.id))
			const { idSrcCell, idSrcCard, idFinalCell } = monitor.getDropResult() as TypeDataEndDragging;
			const data = changeData(idSrcCell, idSrcCard, idFinalCell);
			setPositionDrag('noDrag');
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
	}), [prevCard]);

	const searchParent = (node: HTMLElement, searchSelector: string, selectorValue: string): HTMLElement | Function => {
		if (node === cardRef.current) return node;
		else return searchParent(node.parentElement!, searchSelector, selectorValue);
	}

	const handlerDragOver = (e: React.DragEvent) => {
		const y = e.clientY;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, 'card', 'true') as HTMLElement;
		if (parent !== prevCard?.el) {
			if (prevCard)
				dispatch(updateCardF(prevCard.id));
			dispatch(setPrevCard({ el: parent, id: dataCard.id }));
		}
		const coordEl = parent.getBoundingClientRect();
		if (y < Math.ceil(coordEl.top + (coordEl.height / 2))) {
			if (positionDrag === 'before' && parent === prevCard?.el && prevCard !== null) return;
			else {
				setPositionDrag('before');
			}
		} else {
			if (positionDrag === 'after' && parent === prevCard!.el && prevCard !== null) return;
			else {
				setPositionDrag('after');
			}
		}
	}

	useEffect(() => {
		if (updateCard === dataCard.id && positionDrag !== 'noDrag') {
			setPositionDrag('noDrag');
		}
	}, [updateCard, dataCard.id, positionDrag]);

	return (
		<li
			className={`
				${style.card}
				${positionDrag === 'before' ?
					style.card__topline : positionDrag === 'after' ?
						style.card__bottomline : ''
				}
			`}
			id={dataCard.id.toString()}
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