import React, { FC, useEffect, useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

//data
import { changeDataCard, TypeCard } from '../../data/dataCell';

//components
import { EditModal } from './EditModal';

//styles
import style from './card.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';
import { setPrevCard, updateCardF } from '../../redux/actions/actionsCard';
import { setOpenModal } from '../../redux/actions/actionsModal';

//lib
import { searchParent } from '../../lib/type';

//types
import { R } from '../../redux/reducers';
import { PositionDrop } from '../../redux/types/typeCard';
import { Modal } from '../modal/modal';
type PropsCard = {
	dataCard: TypeCard,
	idCell: string,
	numberList: number;
}
type TypeDataEndDragging = {
	idFinalCell: string,
	idSrcCard: string,
	idSrcCell: string,
}

export const CardMemo: FC<PropsCard> = ({ dataCard, idCell, numberList }) => {
	const dispatch = useDispatch();
	const cardRef = useRef<HTMLElement>(null!);
	const [positionDrop, setPositionDrop] = useState<PositionDrop>('noDrag');
	const [hoverCard, setHoverCard] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

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
		if (hoverCard) setHoverCard(false);
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

	const handlerHoverCard = () => {
		if (!hoverCard)
			setHoverCard(true);
	}

	const handlerNoHoverCard = () => {
		setHoverCard(false);
	}

	const handlerOpenModal = () => {
		setOpenModal(true)
	}

	useEffect(() => { }, [hoverCard, openModal]);

	useEffect(() => {
		if (updateCard === dataCard.id && positionDrop !== 'noDrag') {
			dispatch(updateCardF(null))
			setPositionDrop('noDrag');
		}
		setHoverCard(false);
	}, [
		updateCard,
		dataCard.id,
		positionDrop,
		numberList,
		dispatch,
	]);

	return (
		<>
			{openModal ?
				<Modal close={() => setOpenModal(false)}>
					<EditModal close={() => setOpenModal(false)} title={dataCard.title} desc={dataCard.desc} />
				</Modal>
				: null
			}
			<li
				className={`
					${style.card}
					${positionDrop === 'before' ?
						style.card__topline : positionDrop === 'after' ?
							style.card__bottomline : ''
					}
					${hoverCard ? style.card__hover : ""}
				`}
				ref={(r) => {
					drag(r);
					cardRef.current = r!;
				}}
				onDragOver={(e) => handlerDragOver(e)}
				onMouseOver={handlerHoverCard}
				onMouseLeave={handlerNoHoverCard}
				onClick={handlerOpenModal}
			>
				<div style={isDragging ? { opacity: 0.5 } : {}}
					className={`
						${style.card__wrapper} 
						${isDragging ? style.card__wrapper_dragging : ''}
					`}
				>
					<span className={style.card__title}>{dataCard.title}</span>
					<span className={style.card__desc}>{dataCard.desc}</span>
				</div>
			</li>
		</>
	)
}

export const Card = React.memo(CardMemo, (prev, next) => {
	// false - обновляем (нюанс react.memo)
	if (prev.numberList === next.numberList && prev.idCell === next.idCell)
		return true
	return false
})