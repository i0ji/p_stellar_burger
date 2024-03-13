import styles from "./Pages.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {registerUser} from "utils/api.ts";

import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "hooks/useForm.ts";
import {IForm} from "declarations/interfaces";
import {AppDispatch} from "declarations/types";

export default function RegisterPage() {
	
	const dispatch = useDispatch<AppDispatch>();
	const {values, handleChange} = useForm<IForm>({});
	const [isPasswordShow, setIsPasswordShow] = useState(false);
	const isFormEmpty = !values.email || !values.password || !values.name;
	
	// --------------- PWD VISIBILITY
	const togglePasswordVisibility = () => {
		setIsPasswordShow(!isPasswordShow);
	};
	// --------------- REGISTER
	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const refreshToken = localStorage.getItem('refreshToken');
		console.log(refreshToken);
		dispatch(registerUser(values));
	}
	
	return (
		<section className={styles.section}>
			<form
				onSubmit={handleRegister}
			>
				<h1 className="text text text_type_main-medium pb-6">Регистрация</h1>
				<Input
					onChange={handleChange}
					type={'text'}
					placeholder={'E-mail'}
					icon={undefined}
					name={'email'}
					value={values.email ?? ''}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Input
					onChange={handleChange}
					type={isPasswordShow ? 'text' : 'password'}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					name={'password'}
					value={values.password ?? ''}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
					onIconClick={togglePasswordVisibility}
				/>
				<Input
					onChange={handleChange}
					type={'text'}
					placeholder={'Имя'}
					icon={undefined}
					name={'name'}
					value={values.name ?? ''}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass="mb-6"
				/>
				<Button
					disabled={isFormEmpty}
					htmlType="submit"
					extraClass="mb-20"
					type="primary">
					Зарегистрироваться
				</Button>
				
				<p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
			</form>
		</section>
	);
}