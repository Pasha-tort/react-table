import React, { FC } from 'react';

//libs
import { v4 as uuid } from 'uuid';

//Components
import { Cell } from '../cell';

//styles
import style from './bord.module.scss';

//types
type PropsCellList = {
	cells: any[],
}

export const BordList: FC<PropsCellList> = ({ cells }) => {

	return (
		<div className={style.bord__wrapper}>
			<ul className={style.bord__list}>
				{
					cells.map(cell => {
						return <Cell key={uuid()} />
					})
				}
			</ul>
			<button className={style.bord__btn}>
				+
			</button>
		</div>
	)
}