import React, { FC } from 'react';

//styles
import style from './line.module.scss';

//type
type PropsLine = {
	active: boolean;
}

export const Line: FC = () => {
	return <div className={style.line}>
	</div>
}