import React, { FC, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

//components
import { CellList } from './CellList';

//actions
import { setPrevCell, updateCellF } from '../../redux/actions/actionsCell';

//styles
import style from './cell.module.scss';

//data
import { changeDataCell, TypeCell } from '../../data/dataCell';

//lib
import { searchParent } from '../../lib/type';

//types
import { R } from '../../redux/reducers';
import { PositionDrop } from '../../redux/types/typeCard';
import { setDataBord } from '../../redux/actions/actionsBord';

type PropsDataCell = {
	dataCell: TypeCell,
	numberCell: number,
}

export const CellMemo: FC<PropsDataCell> = ({ dataCell, numberCell }) => {

	const dispatch = useDispatch();
	const cellRef = useRef<HTMLElement>(null!);
	const titleCellRef = useRef<HTMLHeadingElement>(null!);
	const { prevCell, updateCell } = useSelector((r: R) => r.reducerCell);
	const [positionDrop, setPositionDrop] = useState<PositionDrop>("noDrag");
	const [lastClick, setLastClick] = useState<HTMLElement | null>(null);

	const [{ isDragging, typeDragEll }, drag] = useDrag(() => ({
		type: "cell",
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
			dispatch(updateCellF(prevCell!.id));
			const { numberCellDrop, positionDrop } = prevCell!;
			const data = changeDataCell(dataCell.id, numberCellDrop, positionDrop);
			setPositionDrop("noDrag");
			dispatch(setDataBord(data));
			setLastClick(null)
		},
		item: {
			idSrcCell: dataCell.id,
		},
		options: {
			dropEffect: "move",
		},
		isDragging: (monitor) => {
			return monitor.getItem().idSrcCell === dataCell.id;
		},
		canDrag: () => {
			if (lastClick === titleCellRef.current)
				return true;
			else return false;
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			typeDragEll: monitor.getItemType(),
		}),
	}), [prevCell, numberCell, lastClick]);

	const handlerDragOver = (e: React.DragEvent) => {
		if (typeDragEll !== "cell") return;
		const x = e.clientX;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, cellRef.current) as HTMLElement;
		if (prevCell && parent !== prevCell.el)
			dispatch(updateCellF(prevCell.id));
		const coordEll = parent.getBoundingClientRect();
		if (x < Math.ceil(coordEll.left + (coordEll.width / 2))) {
			if (positionDrop === 'before' && prevCell && parent === prevCell.el) return;
			else {
				setPositionDrop('before');
				dispatch(setPrevCell({
					el: parent,
					id: dataCell.id,
					numberCellDrop: numberCell,
					positionDrop: 'before',
				}));
			}
		} else {
			if (positionDrop === 'after' && prevCell && parent === prevCell.el) return;
			else {
				setPositionDrop('after');
				dispatch(setPrevCell({
					el: parent,
					id: dataCell.id,
					numberCellDrop: numberCell,
					positionDrop: 'after',
				}));
			}
		}
	}

	const handlerLastClick = (e: React.MouseEvent) => {
		setLastClick(e.target as HTMLElement)
	}

	useEffect(() => {
		if (updateCell === dataCell.id && positionDrop !== 'noDrag') {
			// 0 -тоесть сброс на нулевой айдишник;
			dispatch(updateCellF(null));
			setPositionDrop('noDrag');
		}
	}, [
		dataCell.list.length,
		updateCell,
		dataCell.id,
		positionDrop,
		numberCell,
		dispatch,
	]);

	return (
		<li
			className={`
				${style.cell}
				${positionDrop === 'before' ?
					style.cell__beforeline : positionDrop === 'after' ?
						style.cell__afterline : ""
				}
			`}
			ref={r => {
				drag(r);
				cellRef.current = r!;
			}}
			onDragOver={(e) => handlerDragOver(e)}
		>
			<div
				className={`
					${style.cell__wrapper}
					${isDragging ? style.cell__wrapper_dragging : style.cell__wrapper}
				`}
			>
				<h3
					className={style.cell__title}
					onMouseDown={handlerLastClick}
					ref={titleCellRef}
				>
					{dataCell.title}
				</h3>
				<CellList numberCell={numberCell} cards={dataCell.list} id={dataCell.id} />
			</div>
		</li >
	)
}

export const Cell = React.memo(CellMemo, (prev, next) => {
	// false - обновляем (нюанс react.memo)
	// if (prev.numberCell === next.numberCell) {
	// 	console.log('равен', next.dataCell.id)
	// 	return true;
	// }
	return false
});

