import React, { FC } from 'react';
import ReactDOM from 'react-dom';

//styles
import style from '../card/card.module.scss';

//types
type PropsDragPreview = {
	children: React.ReactElement,
	isDragging: boolean,
}

export const DragPreviewComponent: FC<PropsDragPreview> = ({ children, isDragging }) => {

	if (isDragging) {
		return ReactDOM.createPortal(
			children
			, document.getElementById('root')!
		)
	} else {
		return null;
	}


}