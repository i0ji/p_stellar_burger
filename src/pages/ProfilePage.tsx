import styles from "./Pages.module.scss";

import {Link, useNavigate} from "react-router-dom";
import {useForm} from "hooks/useForm.ts";
import {useState, useEffect, SetStateAction} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Loader from "components/common/Loader/Loader.tsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {getUserData, updateUserData} from "utils/api.ts";
import {logout} from "slices/authSlice.ts";
import {RootState} from "interfaces/rootState.ts";


export default function ProfilePage() {
    const isActive = location.pathname === '/profile'
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.authSlice.userData);

    const [showUpdateButtons, setShowUpdateButtons] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);

    // // --------------- GET USER DATA
    useEffect(() => {
        dispatch(getUserData());
    }, []);
    //  --------------- LOADER
    if (!userData) {
        return <Loader/>;
    }
    //  --------------- LOGOUT
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    //  --------------- NEW PROFILE LOGIC ---------------
    const handleEditIconClick = (fieldName: SetStateAction<null>) => {
        if (!isEditing) {
            setEditingField(fieldName);
            setIsEditing(true);
        }
        setShowUpdateButtons(true);
    }

    const handleSave = async () => {
        setShowUpdateButtons(false);
        dispatch(updateUserData({[editingField]: values[editingField]}));
        dispatch(getUserData());
        setEditingField(null);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setShowUpdateButtons(false);
        setValues(userData);
        setTimeout(() => {
            setEditingField(null);
            setIsEditing(false);
        }, 250);
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
                            value={(editingField === 'name') ? (values.name || '') : userData.name}
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
                            value={(editingField === 'email') ? (values.email || '') : userData.email}
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
                            <div
                                className={`${styles.profile_update_button} ${showUpdateButtons ? styles.fadeIn : styles.fadeOut}`}>
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