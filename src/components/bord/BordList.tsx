import React, { FC } from 'react';
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
	const [, drop] = useDrop(() => ({
		accept: "cell",
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}), [data.length]);

	return (
		<div className={style.bord__wrapper}>
			<ul
				className={style.bord__list}
				ref={drop}
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
