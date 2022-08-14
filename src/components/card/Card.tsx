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
// import { setDataBord } from '../../redux/actions/actionsBord';
// import { setPrevCard, updateCardF } from '../../redux/actions/actionsCard';
// import { setOpenModal } from '../../redux/actions/actionsModal';
import { setDataBord } from '../../redux/reducers/sliceBord';
import { setPrevCard, updateCardFunc } from '../../redux/reducers/sliceCard';

//lib
import { searchParent } from '../../lib/type';

//types
// import { R } from '../../redux/reducers';
// import { PositionDrop } from '../../redux/types/typeCard';
import { PositionDrop } from '../../redux/reducers/sliceCard';
import { Modal } from '../modal/modal';
import { getRequest } from '../../hooks/useFetch';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
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

	const sliceState = createSelector(
		(state: RootState) => state.reducerCard,
		(dataCard) => dataCard,
	);
	const { prevCard, updateCard } = useSelector(sliceState);
	const [{ isDragging, typeDragEll }, drag] = useDrag(() => ({
		type: 'card',
		end: async (_, monitor) => {
			if (!monitor.getDropResult()) return;
			dispatch(updateCardFunc(prevCard!.id));
			const { numberCardDrop, positionDrop } = prevCard!;
			const { idSrcCell, idSrcCard, idFinalCell } = monitor.getDropResult() as TypeDataEndDragging;
			const { request } = getRequest();
			const { items } = await request(
				"/setCardsAfterDND",
				"POST",
				JSON.stringify({
					srcCellId: idSrcCell,
					srcElId: idSrcCard,
					finalCellId: idFinalCell,
					numberCardDrop,
					positionDrop,
				}),
			);
			setPositionDrop('noDrag');
			dispatch(setDataBord(items));
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
			dispatch(updateCardFunc(prevCard.id));

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
			dispatch(updateCardFunc(null))
			setPositionDrop('noDrag');
		}
		setHoverCard(false);
	}, [
		updateCard,
		dataCard.id,
		dataCard.desc,
		dataCard.title,
		positionDrop,
		numberList,
		dispatch,
	]);

	return (
		<>
			{openModal ?
				<Modal close={() => setOpenModal(false)}>
					<EditModal close={() => setOpenModal(false)} id={dataCard.id} title={dataCard.title} desc={dataCard.desc} />
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
	if (
		prev.numberList === next.numberList &&
		prev.idCell === next.idCell &&
		prev.dataCard.desc === next.dataCard.desc &&
		prev.dataCard.title === next.dataCard.title
	)
		return true
	return false
})