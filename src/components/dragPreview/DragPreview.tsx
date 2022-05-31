import React, { FC } from 'react';
import ReactDOMServer from 'react-dom/server';

//styles
import style from '../card/card.module.scss';

//components
import { CardView } from '../card';
import { TypeCard } from '../../data/dataCell';

import ReactDOM from 'react-dom';

//types
type PropsDragPreview = {
	children: React.ReactElement,
	isDragging: boolean,
}

// export const DragPreviewComponent: FC<PropsDragPreview> = ({ children, isDragging }) => {

// 	// const {isDragging} = useDragLayer((monitor) => {
// 	// 	return {
// 	// 		isDragging: !!monitor.isDragging,
// 	// 	}
// 	// })
// 	console.log(isDragging)
// 	if (isDragging) {
// 		return ReactDOM.createPortal(
// 			children
// 			, document.getElementById('root')!
// 		)
// 	} else {
// 		return null;
// 	}
// }

export const DragPreviewComponent: FC<PropsDragPreview> = ({ children, isDragging }) => {
	return (
		<>
			{
				!isDragging ? null :
					ReactDOM.createPortal(
						children,
						document.getElementById('root')!,
					)
			}
		</>
	)
}