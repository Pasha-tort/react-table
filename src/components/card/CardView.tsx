import React, { FC, useEffect } from 'react';
import { ConnectDragPreview, ConnectDragSource, DragPreviewImage, useDragLayer } from 'react-dnd';
import { TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	// refAnchor: ConnectDragSource | ConnectDragPreview;
	styles: string;
	dataCard: TypeCard;
}

export const CardView: FC<PropsCardPreview> = ({ styles, dataCard }) => {

	const collectedProps = useDragLayer(
		monitor => {
			monitor.getItem()
		}
	)

	useEffect(() => {

	}, [styles]);

	return (
		<li
			className={styles}
		>
			<span className={style.card__title}>{dataCard.title}</span>
			<span className={style.card__desc}>{dataCard.desc}</span>
		</li>
	)
}