import styles from "pages/Pages.module.scss"


import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {loginAsync} from "slices/authSlice.ts";
import {useForm} from "hooks/useForm.ts";
import WarningMessage from "components/common/WarningMessage/WarningMessage.tsx";
import Loader from "components/common/Loader/Loader.tsx";

export default function LoginPage() {
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authState = useSelector(state => state.authSlice);
	
	
	const handleLogin = () => {
		const credentials = {
			email: values.email,
			password: values.password,
		};
		dispatch(loginAsync(credentials));
	};
	
	const {values, handleChange} = useForm({});
	
	
	useEffect(() => {
		if (authState.status === 'succeeded') {
			// Действия, которые нужно выполнить при успешной авторизации
			console.log('Авторизация прошла успешно');
			console.log('Получен accessToken:', authState.accessToken);
			console.log('Получен refreshToken:', authState.refreshToken);
		}
	}, [authState.status, authState.accessToken, authState.refreshToken]);
	
	
	if (authState.status === 'succeeded') {
		return navigate('/');
	}
		
	if (authState.status === 'failed') {
		return navigate('/warning');
	}
	
	
	return (
		<section className={styles.section}>
			<form>
				<h1 className="text text text_type_main-medium pb-6">Вход</h1>
				<Input
					onChange={handleChange}
					name={'email'}
					type={'text'}
					placeholder={'E-mail'}
					icon={undefined}
					value={values.email ?? ''}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				
				<Input
					onChange={handleChange}
					name={'password'}
					type={'password'}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					value={values.password ?? ''}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button
					htmlType="button"
					extraClass="mb-20"
					type="primary"
					onClick={handleLogin}
				>
					Войти
				</Button>
				
				<p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
				
				<p>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></p>
			</form>
		</section>
	);
}