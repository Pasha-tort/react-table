import React, { FC, useEffect, useRef } from 'react';

//components
import { CellList } from './CellList';

//styles
import style from './cell.module.scss';

//lib
import { searchParent } from '../../lib/type';

//types
import { TypeCell } from '../../data/dataCell';
import { useDrag } from 'react-dnd';
type PropsDataCell = {
	dataCell: TypeCell,
}

export const Cell: FC<PropsDataCell> = ({ dataCell }) => {

	const cellRef = useRef<HTMLElement>(null!);

	const [{ isDragging }, drag] = useDrag(() => ({
		type: "cell",
		end: (_, monitor) => {
			if (!monitor.getDropResult()) return;
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
			isDragging: monitor.isDragging()
		}),
	}), []);

	const handlerDragOver = (e: React.DragEvent) => {
		const y = e.clientY;
		const el = e.target as HTMLElement;
		const parent = searchParent(el, cellRef.current) as HTMLElement;
		console.log(parent)
	}

	useEffect(() => {
	}, [dataCell.list.length])

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
			<span
				className={style.cell__title}
			>
				{dataCell.title}
			</span>
			<CellList cards={dataCell.list} id={dataCell.id} />
		</li >
	)
}

