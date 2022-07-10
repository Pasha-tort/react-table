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
	numberCell: number;
}

export const Cell: FC<PropsDataCell> = ({ dataCell, numberCell }) => {

	const dispatch = useDispatch();
	const cellRef = useRef<HTMLElement>(null!);
	const { prevCell, updateCell } = useSelector((r: R) => r.reducerCell);
	const [positionDrop, setPositionDrop] = useState<PositionDrop>("noDrag");

	const [{ isDragging, typeDragEll }, drag] = useDrag(() => ({
		type: "cell",
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
			dispatch(updateCellF(prevCell!.id));
			const { numberCellDrop, positionDrop } = prevCell!;
			const data = changeDataCell(dataCell.id, numberCellDrop, positionDrop);
			// setPositionDrop("noDrag");
			// dispatch(setDataBord(data));
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
		canDrag: (monitor) => {
			return true;
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			typeDragEll: monitor.getItemType(),
		}),
	}), []);

	const handlerDragOver = (e: React.DragEvent) => {
		if (typeDragEll !== "cell") return;
		const x = e.clientX;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, cellRef.current) as HTMLElement;
		if (prevCell && parent !== prevCell.el)
			dispatch(updateCellF(prevCell.id));

		const coordEll = parent.getBoundingClientRect();
		if (x < Math.ceil(coordEll.top + (coordEll.height / 2))) {
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

	useEffect(() => {
		if (updateCell === dataCell.id && positionDrop !== 'noDrag')
			setPositionDrop('noDrag');
	}, [
		dataCell.list.length,
		updateCell,
		dataCell.id,
		positionDrop,
		numberCell
	]);

	return (
		<li
			className={style.cell}
			ref={r => {
				drag(r);
				cellRef.current = r!;
			}}
			style={isDragging ? { opacity: 0.5 } : {}}
			onDragOver={(e) => handlerDragOver(e)}
		>
			<h3
				className={style.cell__title}
			>
				{dataCell.title}
			</h3>
			<CellList cards={dataCell.list} id={dataCell.id} />
		</li >
	)
}

// export const Cell = React.memo(CellMemo, (prev, next) => {
// 	// false - обновляем (нюанс react.memo)
// 	// if (prev.numberCell === next.numberCell)
// 	// 	return true;
// 	// return false
// 	return false
// });

