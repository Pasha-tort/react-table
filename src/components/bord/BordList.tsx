import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

//libs
import { useDrop } from 'react-dnd';

//Components
import { Cell } from '../cell';

//styles
import style from './bord.module.scss';

//actions
import { R } from '../../redux/reducers';

export const BordList: FC = () => {

	const { data } = useSelector((state: R) => state.reducerBord);
	const bordListRef = useRef<HTMLUListElement>(null!);
	const [, drop] = useDrop(() => ({
		accept: "cell",
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}), [data.length]);

	useEffect(() => {
		const { width } = bordListRef.current.getBoundingClientRect();
		bordListRef.current.style.width = `${width}px`;
	});

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
			<button className={style.bord__btn}>
				+
			</button>
		</div>
	)
}
