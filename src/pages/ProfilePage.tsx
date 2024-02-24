import styles from "./FormsPage.module.scss"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export default function ProfilePage() {
	return (
		<section className={styles.profile_section}>
			
			<div className={styles.profile_block}>
				<div className={styles.profile_buttons}>
					<Link to='/xxxx' className='mb-10'>
						<Button
							extraClass={`text text_type_main-medium`}
							htmlType="button"
							type="secondary"
							size="medium"
						>
							Профиль
						</Button>
					</Link>
					<Link to='/orders' className='mb-10'>
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
						>
							Выход
						</Button>
					</Link>
					<p>В этом разделе вы можете изменить свои персональные данные</p>
				</div>
				
				<form>
					<Input
						onChange={() => {
							console.log('INPUT 1')
						}}
						type={'text'}
						placeholder={'Имя'}
						icon={'EditIcon'}
						value={''}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						onChange={() => {
							console.log('INPUT 1')
						}}
						type={'text'}
						placeholder={'Логин'}
						icon={'EditIcon'}
						value={''}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass="mb-6"
					/>
					<Input
						onChange={() => {
							console.log('INPUT 1')
						}}
						type={'text'}
						placeholder={'Пароль'}
						icon={'EditIcon'}
						value={''}
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