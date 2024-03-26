import styles from "./ProfilePage.module.scss";

import {Link, useNavigate} from "react-router-dom";
import {getUserData, updateUserData, logoutUser} from "utils/api.ts";

import {RootState} from "declarations/rootState.ts";
import {TInputElementType} from "declarations/types";
import {IForm} from "declarations/interfaces";

import {useForm} from "hooks/useForm.ts";
import {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {ProfileOrders} from "pages/index.ts";

import Loader from "common/Loader/Loader.tsx";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfilePage() {

    const navigate = useNavigate();
    const isActive = location.pathname === '/profile'
    const {values, handleChange, setValues} = useForm<IForm>({});
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.authSlice.userData);
    const refreshToken = localStorage.getItem('refreshToken');
    const [showUpdateButtons, setShowUpdateButtons] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState<{
        name: string | null;
        password: string | null;
        email: string | null;
    }>
    ({
        name: null,
        password: null,
        email: null
    });
    const nameInputRef = useRef<TInputElementType>(null);
    const emailInputRef = useRef<TInputElementType>(null);
    const passwordInputRef = useRef<TInputElementType>(null);
    const authStatus = useSelector((state: RootState) => state.authSlice.status);

    useEffect(() => {
        if (isEditing && editingField !== null) {
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
        navigate('/');
    };
    //  --------------- EDIT ---------------
    const handleEditIconClick = (fieldName: string) => {
        if (!isEditing) {
            setEditingField(fieldName);
            setIsEditing(true);
            setValues({...values, [fieldName]: ''});
        }
        setShowUpdateButtons(true);
    }
    //  --------------- SAVE DATA
    const handleSave = async () => {
        if (editingField) {
            const updatedValues = {...editedValues, [editingField]: values[editingField]};
            setEditedValues(updatedValues);
            dispatch(getUserData());
            dispatch(updateUserData({[editingField]: values[editingField]}));
            setEditingField(null);
            setIsEditing(false);
            setShowUpdateButtons(false);
        }
    };

    //  --------------- CANCEL CHANGE
    const handleCancel = () => {
        setShowUpdateButtons(false);
        setTimeout(() => {
            setEditingField(null);
            setIsEditing(false);
        }, 250);
    };
    //  --------------- LOADER

    if (!userData || (authStatus === 'loading')) {
        return <Loader/>;
    }

    return (
        <section className={styles.profile_section}>

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
                <Link to='/profile/orders' className='mb-10'>
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

            <div className={styles.profile_content}>

                {location.pathname === '/profile/orders' ? <ProfileOrders/> :
                    <form>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="mb-6"
                            value={(editingField === 'name') ? (values.name || '') : (editedValues.name || userData.name) ?? ''}
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
                            value={(editingField === 'email') ? (values.email || '') : (editedValues.email || userData.email) ?? ''}
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
                            value={((editingField == 'password') && values.password || '') ?? ''}
                            onChange={handleChange}
                            onIconClick={() => handleEditIconClick('password')}
                            icon={(editingField == 'password') ? undefined : 'EditIcon'}
                            ref={passwordInputRef}
                        />
                        {
                            isEditing && editingField && (
                                <div
                                    className={`${styles.profile_update_button} ${showUpdateButtons ? styles.fadeIn : styles.fadeOut}`}
                                >

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
                            )
                        }
                    </form>
                }
            </div>

        </section>
    )
}
