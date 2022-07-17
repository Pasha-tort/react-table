import { FC, useCallback, useEffect, useRef } from 'react';

//styles
import style from "./modalMini.module.scss";

//libs
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type PropsModalMini = {
	defaultValue: string;
	close: () => void;
}

export const ModalMini: FC<PropsModalMini> = ({ defaultValue, close }) => {

	const formRef = useRef<HTMLFormElement>(null);

	const handlerClose = useCallback((e: MouseEvent) => {
		const t = e.target;
		if (t && !formRef.current?.contains(t as Node))
			close()
	}, [close]);

	useEffect(() => {
		setTimeout(() => {
			document.addEventListener('click', handlerClose);
		})
		return () => {
			document.removeEventListener('click', handlerClose);
		}
	}, [handlerClose]);

	return (
		<Formik
			initialValues={{
				titleCell: defaultValue,
			}}
			validationSchema={Yup.object({
				titleCell: Yup.string()
					.max(64)
					.required(),
			})}
			onSubmit={values => {
				//здесь отправляем на сервер инфу
				//здесь меняем стейт фронта
			}}
		>
			<Form className={style.modalMini} ref={formRef}>
				<Field
					name="titleCell"
					className={style.textarea}
				/>
				<button type="submit" className={style.button}>Send</button>
			</Form>
		</Formik>
	)
}