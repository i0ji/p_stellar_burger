import styles from "./Pages.module.scss";
import {RootState} from "declarations/rootState.ts";
import {TInputElementType} from "declarations/types";

import {Link} from "react-router-dom";
import {useForm} from "hooks/useForm.ts";
import {useState, SetStateAction, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Loader from "components/common/Loader/Loader.tsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {getUserData, updateUserData, logoutUser} from "utils/api.ts";
export default function ProfilePage() {

    const isActive = location.pathname === '/profile'
    const {values, handleChange, setValues} = useForm({});
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.authSlice.userData);
    const refreshToken = localStorage.getItem('refreshToken');
    const [showUpdateButtons, setShowUpdateButtons] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [editedValues, setEditedValues] = useState({
        name: null,
        password: null,
        email: null
    });

    const nameInputRef = useRef<TInputElementType>(null);
    const emailInputRef = useRef<TInputElementType>(null);
    const passwordInputRef = useRef<TInputElementType>(null);

    useEffect(() => {
        if (isEditing && editingField !==null) {
            switch (editingField) {
                case 'name':
                    nameInputRef.current?.focus();
                    break;
                case 'email':
                    emailInputRef.current?.focus();
                    break;
                case 'password':
                    passwordInputRef.current?.focus();
                    break;
                default:
                    break;
            }
        }
    }, [isEditing, editingField]);

    //  --------------- LOGOUT
    const handleLogout = () => {
        dispatch(logoutUser(refreshToken));
    };
    //  --------------- EDIT ---------------
    const handleEditIconClick = (fieldName: SetStateAction<null>) => {
        if (!isEditing) {
            setEditingField(fieldName);
            setIsEditing(true);
            setValues({...values, [fieldName]: ''});
        }
        setShowUpdateButtons(true);
    }
    //  --------------- SAVE DATA
    const handleSave = async () => {
        setEditedValues({ ...editedValues, [editingField]: values[editingField] });
        dispatch(getUserData());
        dispatch(updateUserData({[editingField]: values[editingField]}));
        setEditingField(null);
        setIsEditing(false);
        setShowUpdateButtons(false);
    };
    //  --------------- CANCEL CHANGE
    const handleCancel = () => {
        setShowUpdateButtons(false);
        setValues(userData);
        setTimeout(() => {
            setEditingField(null);
            setIsEditing(false);
        }, 250);
    };
    //  --------------- LOADER
    if (!userData) {
        return <Loader/>;
    }

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
                    <Link to='/' className="mb-20">
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
                            value={(editingField === 'name') ? (values.name || '') : (editedValues.name || userData.name)}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('name')}
                            icon={(editingField == 'name') ? undefined : 'EditIcon'}
                            ref={nameInputRef}
                        />
                        <Input
                            type={'text'}
                            placeholder={'Почта'}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={(editingField === 'email') ? (values.email || '') : (editedValues.email || userData.email)}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('email')}
                            icon={(editingField == 'email') ? undefined : 'EditIcon'}
                            ref={emailInputRef}
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
                            ref={passwordInputRef}
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