import {Button, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useState} from "react";

export default function HeaderButton({typeFor}: { typeFor: string }) {
	
	const [activeTab, setActiveTab] = useState(typeFor === 'builder');
	
	switch (typeFor) {
		case 'builder':
			return (
				<NavLink
					className={({isActive}: { isActive: boolean }) => {
						setActiveTab(isActive);
						return isActive ? 'active' : 'not_active';
					}}
					to="/"
				>
					<BurgerIcon
						type={activeTab ? 'primary' : 'secondary'}
					/>
					<Button
						extraClass='p-1 text text_type_main-default'
						htmlType="button"
						type="secondary"
						size="medium"
					>
						Конструктор
					</Button>
				</NavLink>
			
			)
		case 'orders':
			return (
				<NavLink
					className={({isActive}: { isActive: boolean }) => {
						setActiveTab(isActive);
						return isActive ? 'active' : 'not_active';
					}}
					to="/xxxx"
				>
					<ListIcon
						type={activeTab ? 'primary' : 'secondary'}
					/>
					<Button
						extraClass='p-1 text text_type_main-default'
						htmlType="button"
						type="secondary"
						size="medium"
					>
						Лента заказов
					</Button>
				</NavLink>
			)
		case 'profile':
			return (
				<NavLink
					className={({isActive}: { isActive: boolean }) => {
						setActiveTab(isActive);
						return isActive ? 'active' : 'not_active';
					}}
					to="/profile"
				>
					<ProfileIcon
						type={activeTab ? 'primary' : 'secondary'}
					/>
					<Button
						extraClass='p-1 text text_type_main-default'
						htmlType="button"
						type="secondary"
						size="medium"
					>
						Личный кабинет
					</Button>
				</NavLink>
			)
	}
}