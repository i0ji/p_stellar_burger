import styles from "./Pages.module.scss"

import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {logout} from "slices/authSlice.ts";

import {Link, useLocation} from "react-router-dom";
import {useForm} from "hooks/useForm.ts";
import {useDispatch, useSelector} from "react-redux";
import {IAuthSlice} from "interfaces/sliceInterfaces";

export default function ProfilePage() {
	
	const {values, handleChange} = useForm({});
	const dispatch = useDispatch();
	const location = useLocation();
	const isActive = location.pathname === '/profile'
	const authState = useSelector((state): IAuthSlice => state.authSlice.isAuth);
	
	
	const handleLogout = () => {
		dispatch(logout());
		console.log(authState)
	};
	
	
	return (
		<section className={styles.profile_section}>
			<div className={styles.profile_block}>
				<div className={styles.profile_buttons}>
					<Link to='/profile' className='mb-10'>
						<Button
							extraClass={`text text_type_main-medium ${isActive ? styles.active : ''}`}
							htmlType="button"
							type="secondary"
							size="medium"
						>
							Профиль
						</Button>
					</Link>
					<Link
						to='/orders'
						className='mb-10'
					>
						<Button
							extraClass={`text text_type_main-medium`}
							htmlType="button"
							type="secondary"
							size="medium"
						>
							История заказов
						</Button>
					</Link>
					<Link to='/logout' className="mb-20">
						<Button
							extraClass={`text text_type_main-medium`}
							htmlType="button"
							type="secondary"
							size="medium"
							onClick={handleLogout}
						>
							Выход
						</Button>
					</Link>
					<p>В этом разделе вы можете изменить свои персональные данные</p>
				</div>
				<form>
					<Input
						onChange={handleChange}
						type={'text'}
						placeholder={'Имя'}
						icon={'EditIcon'}
						name={'name'}
						value={values.name ?? ''}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						onChange={handleChange}
						type={'text'}
						placeholder={'Логин'}
						icon={'EditIcon'}
						name={'login'}
						value={values.login ?? ''}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						onChange={handleChange}
						type={'text'}
						placeholder={'Пароль'}
						icon={'EditIcon'}
						name={'password'}
						value={values.password ?? ''}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
				</form>
			</div>
		</section>
	);
}