import React from 'react';

//styles
import style from './card.module.scss';

export const Card = () => {

	return (
		<li className={style.card}>
			<span className={style.card__title}>Card Title</span>
			<span className={style.card__desc}>Card desc</span>
		</li>
	)
}