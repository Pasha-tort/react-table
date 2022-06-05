import React, { FC, useEffect, forwardRef, useState, useMemo } from 'react';
import { ConnectDragPreview, ConnectDragSource, DragPreviewImage, useDragLayer } from 'react-dnd';
import { TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	type: 'card' | 'preview'
	wrapperRef?: React.MutableRefObject<HTMLDivElement>
	styles: string;
	dataCard: TypeCard;
	styleInline?: {
		width: string | undefined;
	},
	coordinate?: {
		left: string | undefined;
		top: string | undefined;
	}
}

export const CardView = forwardRef<HTMLLIElement, PropsCardPreview>(({ type, styles, dataCard, styleInline, coordinate, wrapperRef }, ref) => {

	const [lastUpdate, setLastUpdate] = useState(+new Date());

	const update = useMemo(() => {
		const now = +new Date();

		if (now - lastUpdate > 16) {
			setLastUpdate(now);
			return +new Date();
		} else return now
	}, [coordinate?.top, coordinate?.left]);

	useEffect(() => {

	}, [update]);

	if (type === 'card') {
		return <li
			ref={ref}
			style={{ listStyleType: 'none', marginTop: '20px' }}
		>
			<div
				className={styles}
				ref={wrapperRef ? wrapperRef : null}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
			</div>
		</li>
	} else {
		return <li
			ref={ref}
			style={{ listStyleType: 'none', left: coordinate?.left, top: coordinate?.top, ...styleInline }}
			className={styles}
		>
			<span className={style.card__title}>{dataCard.title}</span>
			<span className={style.card__desc}>{dataCard.desc}</span>
		</li>
	}
});
