import React, { FC, useEffect } from 'react';
import { ConnectDragPreview, ConnectDragSource} from 'react-dnd';
import { TypeCard } from '../../data/dataCell';
import { useDragLayer } from 'react-dnd';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	styles: string;
	dataCard: TypeCard;
	anchorRef: ConnectDragPreview | ConnectDragSource;
	wrapperRef?: React.MutableRefObject<HTMLDivElement>;
}

export const CardView: FC<PropsCardPreview> = ({ styles, dataCard, anchorRef, wrapperRef }) => {

	useEffect(() => {

	}, [styles]);

	return (
		<li
			className={style.card__wrapper}
			ref={anchorRef}
		>
			<div 
				className={styles}
				ref={wrapperRef}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
			</div>
		</li> 
	)
}
