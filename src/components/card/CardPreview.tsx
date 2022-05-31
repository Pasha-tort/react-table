import React, { FC, useEffect } from 'react';
import { ConnectDragPreview, ConnectDragSource} from 'react-dnd';
import { TypeCard } from '../../data/dataCell';
import { useDragLayer } from 'react-dnd';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	styles: string;
	styleInline?: { top: number | undefined; left: number | undefined; width: number | undefined}
	dataCard: TypeCard;
	anchorRef: ConnectDragPreview | ConnectDragSource;
	wrapperRef?: React.MutableRefObject<HTMLDivElement>;
}

export const CardPreview: FC<PropsCardPreview> = ({ styles, dataCard, styleInline, anchorRef, wrapperRef }) => {

	useEffect(() => {

	}, []);
    // console.log('render')
	return (
		<li
			className={style.card__wrapper}
			ref={anchorRef}
		>
			<div 
				className={styles}
				style={styleInline}
				ref={wrapperRef}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
			</div>
		</li> 
	)
}
