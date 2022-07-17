import { FC, ReactPortal, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
//styles
import { useSelector } from 'react-redux';
import { R } from '../../redux/reducers';
import style from './modal.module.scss';
import styleIndex from "../../scss/index.module.scss";

type PropsModal = {
	children: React.ReactNode;
	close: () => void;
}

export const Modal: FC<PropsModal> = ({ children, close }) => {
	const modalRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		document.body.classList.add(styleIndex.bodyHidden);
		return () => {
			document.body.classList.remove(styleIndex.bodyHidden);
		}
	}, []);

	const handlerClose = (e: React.MouseEvent) => {
		if (e.target === modalRef.current)
			close();
	}

	return ReactDOM.createPortal(
		<div
			ref={modalRef}
			className={style.modal}
			onClick={handlerClose}
		>
			<div className={style.modalWrapper}>
				{children}
			</div>
		</div>
		, document.getElementById("root")!
	)
}