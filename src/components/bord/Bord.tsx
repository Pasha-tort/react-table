import React, { useEffect } from 'react';

//styles
import style from './bord.module.scss';

//components
import { BordList } from '../bord';

export const Bord = () => {
	return (
		<div className={style.bord}>
			<h2 className={style.bord__title}>
				Border title
			</h2>
			<BordList />
		</div>
	)
}