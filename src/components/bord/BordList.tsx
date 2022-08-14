import React, { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

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
import { getDataBord } from '../../redux/reducers/sliceBord';
import { setDataBord } from '../../redux/reducers/sliceBord';

//types
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getRequest } from '../../hooks/useFetch';

export const BordList: FC = () => {

	const sliceState = createSelector(
		(state: RootState) => state.reducerBord.data,
		(dataBord) => dataBord
	);
	const data = useSelector(sliceState);
	const bordListRef = useRef<HTMLUListElement>(null!);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getDataBord())
	}, []);

	const [, drop] = useDrop(() => ({
		accept: "cell",
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}), [data.length]);

	const handlerAddCell = async () => {
		const { request } = getRequest();
		const { items } = await request(
			"/addCell",
			"POST",
			JSON.stringify({
				dataCell: {
					id: uuid(),
					title: "",
					list: [],
				}
			}),
		);
		dispatch(setDataBord(items));
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
