
//styles
import style from "./modalMini.module.scss";

//libs
import { } from "rxjs"

export const ModalMini = () => {
	return (
		<form className={style.modalMini}>
			<input className={style.textarea}>

			</input>
			<button className={style.button}>
				Send
			</button>
		</form>
	)
}