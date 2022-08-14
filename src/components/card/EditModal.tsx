import { FC } from 'react'
import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';
import style from "./editModal.module.scss";
import { getRequest } from '../../hooks/useFetch';
import { useDispatch } from "react-redux";
import { setDataBord } from '../../redux/reducers/sliceBord';

type PropsEditModal = {
	title: string;
	desc: string;
	id: string,
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

export const EditModal: FC<PropsEditModal> = ({ title, desc, id, close }) => {
	const dispatch = useDispatch();
	return (
		<Formik
			initialValues={{
				title,
				desc,
				id,
			}}
			validationSchema={Yup.object({
				title: Yup.string()
					.max(64)
					.required(),
				desc: Yup.string()
					.max(512)
					.required(),
			})}
			onSubmit={async (values) => {
				const { request } = getRequest();
				const { items } = await request(
					"/setOneCard",
					"POST",
					JSON.stringify({
						dataCard: {
							id,
							title: values.title,
							desc: values.desc,
						},
					}),
				);
				dispatch(setDataBord(items));
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
		</Formik >
	)
} 