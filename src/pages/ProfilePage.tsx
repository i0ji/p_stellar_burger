import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "hooks/useForm2.ts";
import {getUserData, updateUserData} from "utils/api.ts";
import {logout} from "slices/authSlice.ts";

import styles from "./Pages.module.scss";
import Loader from "components/common/Loader/Loader.tsx";

export default function ProfilePage() {
    const isActive = location.pathname === '/profile'
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.authSlice.userData);

    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);

    // --------------- GET USER DATA
    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);
    //  --------------- LOADER
    if (!userData) {
        return <Loader/>;
    }
    //  --------------- LOGOUT
    const handleLogout = () => {
        navigate('/');
        dispatch(logout());
    };

    //  --------------- NEW PROFILE LOGIC ---------------
    const handleEditIconClick = (fieldName) => {
        if (!isEditing) {
            setEditingField(fieldName);
            setIsEditing(true);
        }
    }

    const handleSave = () => {
        dispatch(updateUserData({[editingField]: values[editingField]}));
        setEditingField(null);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setValues(userData);
        setEditingField(null);
        setIsEditing(false);
    };

    console.log(userData)

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
                            type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={(editingField == 'name') && values.name || userData.name}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('name')}
                            icon={(editingField == 'name') ? undefined : 'EditIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Почта'}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={(editingField == 'email') && values.email || userData.email}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('email')}
                            icon={(editingField == 'email') ? undefined : 'EditIcon'}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Пароль'}
                            name={'password'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={(editingField == 'password') && values.password || ''}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('password')}
                            icon={(editingField == 'password') ? undefined : 'EditIcon'}
                        />
                        {isEditing && editingField && (
                            <div className={styles.profile_update_button}>
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
                            </div>
                        )}
                    </form>
                }
            </div>
        </section>
    );
}