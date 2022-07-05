import React, { FC, useEffect, useState, useRef } from 'react';
import { changeData, TypeCard } from '../../data/dataCell';

//components
import { CardView } from './CardView';
import {CardPreview} from './CardPreview';

//img
import tort from './img/tort.jpg';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';
import { setPrevCard, setNextCard, updateCardF } from '../../redux/actions/actionsCard';

//libs
import { useDrag, useDragLayer, DragSourceMonitor, DragPreviewImage } from 'react-dnd';
import { isDataView } from 'util/types';
import { useDispatch, useSelector } from 'react-redux';

//halper
import { isHTMLElemnt } from '../../lib/type';

//types
import { R } from '../../redux/reducers';
type PropsCard = {
	dataCard: TypeCard,
	idCell: number,
	numberList: number;
	updateCard: number;
}
type TypeDataEndDragging = {
	idFinalCell: number,
	idSrcCard: number,
	idSrcCell: number,
}
type PositionDrag = 'top' | 'bottom' | 'noDrag';

export const CardMemo: FC<PropsCard> = ({ dataCard, idCell, updateCard }) => {
	const dispatch = useDispatch();
	const cardRef = useRef<HTMLElement>(null!);
	const [positionDrag, setPositionDrag] = useState<PositionDrag>('noDrag');

	const { prevCard } = useSelector((r: R) => r.reducerCard);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'card',
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
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
	}));

	const searchParent = (node: HTMLElement, searchSelector: string, selectorValue: string): HTMLElement | Function => {
		if (node === cardRef.current) return node;
		else return searchParent(node.parentElement!, searchSelector, selectorValue);
	}

	const handlerDragOver = (e: React.DragEvent) => {
		const y = e.clientY;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, 'card', 'true') as HTMLElement;

		dispatch(setNextCard({ nextCard: { el: parent, id: dataCard.id } }));
		if (parent !== prevCard?.el) {
			// dispatch(updateCardF({ updateCard: prevCard?.id }))
			// prevCard?.el.classList.remove(style.card__bottomline);
			// prevCard?.el.classList.remove(style.card__topline);
		}
		const coordEl = parent.getBoundingClientRect();
		if (y < Math.ceil(coordEl.top + (coordEl.height / 2))) {
			if (positionDrag === 'top' && parent === prevCard?.el && prevCard !== null) return;
			else {
				setPositionDrag('top');
				dispatch(setPrevCard({ prevCard: { el: parent, id: dataCard.id } }));
			}
		} else {
			if (positionDrag === 'bottom' && parent === prevCard!.el && prevCard !== null) return;
			else {
				setPositionDrag('bottom');
				dispatch(setPrevCard({ prevCard: { el: parent, id: dataCard.id } }));
			}
		}
	}
	const handlerDragLeave = (e: React.DragEvent) => {
    const el = e.target as HTMLElement;
		const parent = searchParent(el, 'card', 'true') as HTMLElement;
		if (parent !== prevCard?.el) {
			setPositionDrag('noDrag');
			// prevCard?.el.classList.remove(style.card__bottomline);
			// prevCard?.el.classList.remove(style.card__topline);
		}
	}

	useEffect(() => {
		// console.log('render')
		// if (updateCard === dataCard.id) {
		// 	console.log('updateCard')
		// }
	}, [positionDrag]);

	return (
		<li
			className={`
				${style.card}
				${positionDrag === 'top' ?
					style.card__topline : positionDrag === 'bottom' ?
						style.card__bottomline : ''
				}
			`}
			id={dataCard.id.toString()}
			ref={(r) => {
				drag(r);
				cardRef.current = r!;
			}}
			onDragOver={(e) => handlerDragOver(e)}
		// onDragLeave={(e) => handlerDragLeave(e)}
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
	// console.log(next.updateCard)
	// if (next.updateCard === next.dataCard.id) return false;
	if (prev.numberList === next.numberList && prev.idCell === next.idCell)
		return true
	return false
})