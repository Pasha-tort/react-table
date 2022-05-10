import React, { FC } from 'react';
import { useDragLayer } from 'react-dnd';
import ReactDOM from 'react-dom';

//types
type PropsDragPreview = {
	children: React.ReactElement,
}

export const DragPreviewComponent: FC<PropsDragPreview> = ({ children }) => {

	const {isDragging} = useDragLayer((monitor) => {
		return {
			isDragging: !!monitor.isDragging,
		}
	})

	if (isDragging) {
		return ReactDOM.createPortal(
			children
			, document.getElementById('root')!
		)
	} else {
		return null;
	}


}