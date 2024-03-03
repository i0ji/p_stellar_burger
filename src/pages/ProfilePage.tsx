import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "hooks/useForm2.ts";
import {getUserData, updateUserData} from "utils/api.ts";
import {logout} from "slices/authSlice.ts";

import styles from "./Pages.module.scss";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import Loader from "components/common/Loader/Loader.tsx";

export default function ProfilePage() {
    const isActive = location.pathname === '/profile'
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.authSlice.userData);

    // Добавление состояния для режима редактирования
    const [isEditing, setIsEditing] = useState(false);

    const handleEditIconClick = () => {
        toggleEditing();
        // Additional logic if needed
    };

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    if (!userData) {
        return <Loader/>
    }

    const handleLogout = () => {
        navigate('/');
        dispatch(logout());
    };

    const handleInputChange = (field, value) => {
        setValues((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const toggleEditing = () => {
        setIsEditing((prevEditing) => !prevEditing);

        if (!isEditing) {
            setValues({
                name: '',
                email: '',
                password: '',
            });
        }
    };

    // Функция для сохранения изменений
    const handleSave = () => {
        // Send the updated data to the server
        dispatch(updateUserData(values));
        toggleEditing(); // Disable editing mode after saving
    };


    console.log(userData)

    // Функция для отмены изменений
    const handleCancel = () => {
        toggleEditing(); // Disable editing mode
        // Additional logic if needed
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

                {userData &&
                    <form>
                        <Input
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            type={'text'}
                            placeholder={'Имя'}
                            icon={!isEditing ? 'EditIcon' : undefined}
                            name={'name'}
                            value={values.name || userData.name || ''}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            onIconClick={toggleEditing}
                        />
                        <Input
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            type={'text'}
                            placeholder={'Почта'}
                            icon={!isEditing ? 'EditIcon' : undefined}
                            name={'email'}
                            value={values.email || userData.email || ''}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            onIconClick={toggleEditing}
                        />
                        <Input
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            type={'text'}
                            placeholder={'Пароль'}
                            icon={!isEditing ? 'EditIcon' : undefined}
                            name={'password'}
                            value={values.password || ''}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            onIconClick={toggleEditing}
                        />
                        {isEditing && (
                            <>
                                <Button
                                    htmlType="button"
                                    onClick={handleSave}
                                    type="primary"
                                    size="medium"
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={handleCancel}
                                    type="secondary"
                                    size="medium"
                                >
                                    Отмена
                                </Button>
                            </>
                        )}
                    </form>
                }
            </div>
        </section>
    );
}