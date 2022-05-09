import React, { FC, useEffect } from 'react';
import { ConnectDragPreview, ConnectDragSource, DragPreviewImage, useDragLayer } from 'react-dnd';
import { TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	styles: string;
	styleInline?: { top: number | undefined; left: number | undefined; width: number | undefined }
	dataCard: TypeCard;
	refAnchor: ConnectDragPreview | ConnectDragSource;
	ref?: React.MutableRefObject<HTMLLIElement>;
}

export const CardView: FC<PropsCardPreview> = ({ styles, dataCard, styleInline, refAnchor }) => {

	useEffect(() => {

	}, [styles]);

	return (
		<li
			className={styles}
			style={styleInline}
			ref={refAnchor}
		>
			<span className={style.card__title}>{dataCard.title}</span>
			<span className={style.card__desc}>{dataCard.desc}</span>
		</li>
	)
}