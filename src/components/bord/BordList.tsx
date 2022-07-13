import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//libs
import { useDrop } from 'react-dnd';
import { v4 as uuid } from "uuid";

//data
import { addCell } from "../../data/dataCell";

//Components
import { Cell } from '../cell';

//styles
import style from './bord.module.scss';

//actions
import { setDataBord } from '../../redux/actions/actionsBord';

//types
import { R } from '../../redux/reducers';

export const BordList: FC = () => {

	const { data } = useSelector((state: R) => state.reducerBord);
	const bordListRef = useRef<HTMLUListElement>(null!);
	const dispatch = useDispatch();

	const [, drop] = useDrop(() => ({
		accept: "cell",
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}), [data.length]);

	const handlerAddCell = () => {
		const data = addCell({
			id: uuid(),
			title: "",
			list: [],
		});
		dispatch(setDataBord(data));
	}

	return (
		<div className={style.bord__wrapper}>
			<ul
				className={style.bord__list}
				ref={(r) => {
					drop(r);
					bordListRef.current = r!;
				}}
			>
				{
					data.map((cell, i) => {
						return <Cell
							dataCell={cell}
							numberCell={i}
							key={cell.id}
						/>
					})
				}
			</ul>
			<button
				onClick={handlerAddCell}
				className={style.bord__btn}
			>
				+
			</button>
		</div>
	)
}
