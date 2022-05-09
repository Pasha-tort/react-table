import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//styles
import style from './bord.module.scss';

//components
import { BordList } from '../bord';

//type
import { R } from '../../redux/reducers';


export const Bord = () => {

	const { data } = useSelector((state: R) => state.reducerBord);

	// useEffect(() => {
	// 	console.log(data)
	// }, [data]);

	return (
		<div className={style.bord}>
			<div className={style.bord__title}>
				Border title
			</div>
			<BordList data={data} />
		</div>
	)
}