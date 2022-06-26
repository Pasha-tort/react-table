import React, { useEffect } from 'react';

//styles
import style from './bord.module.scss';

//components
import { BordList } from '../bord';

export const Bord = () => {
	return (
		<div className={style.bord}>
			<div className={style.bord__title}>
				Border title
			</div>
			<BordList />
		</div>
	)
}