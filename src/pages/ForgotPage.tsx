import styles from "pages/Pages.module.scss"

import {Link, useNavigate} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {forgotPassword} from "utils/api.ts"

//import {useState} from "react";
import {useForm} from "hooks/useForm.ts";

export default function ForgotPage() {
	
	//const [email, setEmail] = useState('');
	
	const {values, handleChange} = useForm({});
	
	const navigate = useNavigate();
	
	const handleForgotPassword = async () => {
		try {
			const response = await forgotPassword(values.email ?? '');
			console.log(`Ответ: ${response.message}`);
			console.log(`Ответ: ${response.success}`);
			
			if (response.success) navigate('/reset-password');
			
		} catch (error) {
			console.error('Ошибка восстановления пароля:', error);
		}
	}
	
	return (
		<section className={styles.section}>
			<form>
				<h1 className="text text text_type_main-medium pb-6">Восстановить пароль</h1>
				<Input
					onChange={handleChange}
					value={values.email ?? ``}
					name={'email'}
					type={'text'}
					placeholder={'E-mail'}
					icon={undefined}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button
					onClick={handleForgotPassword}
					htmlType="button"
					extraClass="mb-20"
					type="primary">
					Восстановить
				</Button>
				
				<p>Вспомнили пароль?
					<Link
						to="/login"
					>&nbsp;Войти</Link></p>
			</form>
		</section>
	);
}