import { FC } from 'react'
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';
import style from "./editModal.module.scss";

type PropsEditModal = {
	title: string;
	desc: string;
	close: () => void;
}
type PropsTrextArea = {
	className: string;
	name: string;
	type: "string" | "number";
	placeholder: string;
}

const TextArea: FC<PropsTrextArea> = ({ name, ...props }) => {
	const [field] = useField(name);
	return (
		<textarea {...props} {...field} />
	)
}

export const EditModal: FC<PropsEditModal> = ({ title, desc, close }) => {

	return (
		<Formik
			initialValues={{
				title,
				desc,
			}}
			validationSchema={Yup.object({
				title: Yup.string()
					.max(64)
					.required(),
				desc: Yup.string()
					.max(512)
					.required()
			})}
			onSubmit={values => {
				console.log(values)
				//здесь отправляем на сервер инфу
				//здесь меняем стейт фронта
				close();
			}}
		>
			<Form className={style.modalEdit}>
				<TextArea
					className={`
						${style.field}
						${style.fieldTitle}
					`}
					name="title"
					type="string"
					placeholder='Заголовок'
				/>
				<TextArea
					className={`
						${style.field}
						${style.fieldDesc}
					`}
					name="desc"
					type="string"
					placeholder="Описание"
				/>
				<button type="submit">Send</button>
			</Form>
		</Formik>
	)
} 