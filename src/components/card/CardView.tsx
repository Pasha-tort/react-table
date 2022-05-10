import React, { FC, useEffect } from 'react';
import { ConnectDragPreview, ConnectDragSource} from 'react-dnd';
import { TypeCard } from '../../data/dataCell';

//styles
import style from './card.module.scss';

//types
type PropsCardPreview = {
	styles: string;
	styleInline?: { top: number | undefined; left: number | undefined; width: number | undefined }
	dataCard: TypeCard;
	refAnchor: ConnectDragPreview | ConnectDragSource;
	refWrapper?: React.MutableRefObject<HTMLDivElement>;
}

export const CardView: FC<PropsCardPreview> = ({ styles, dataCard, styleInline, refAnchor, refWrapper }) => {

	useEffect(() => {

	}, [styles]);

	return (
		<li
			className={style.card__wrapper}
			ref={refAnchor}
		>
			<div 
				className={styles}
				style={styleInline}
				ref={refWrapper}
			>
				<span className={style.card__title}>{dataCard.title}</span>
				<span className={style.card__desc}>{dataCard.desc}</span>
			</div>
		</li> 
	)
}