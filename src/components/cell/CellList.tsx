import React, { FC } from 'react';

//libs
import { v4 as uuid } from 'uuid'

//componetns
import { Card } from '../card';

//styles
import style from './cell.module.scss';

//types
type PropsCellList = {
	cards: any[],
}

export const CellList: FC<PropsCellList> = ({ cards }) => {

	return (
		<div className={style.cell__wrapper}>
			<ul className={style.cell__list}>
				{
					cards.map(card => {
						return <Card key={uuid()} />
					})
				}
			</ul>
			<button className={style.cell__btn}>
				+
			</button>
		</div>

	)
}