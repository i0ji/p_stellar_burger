import styles from "./ProfilePage.module.scss";

import {getUserData, updateUserData} from "utils/api.ts";

import {TInputElementType} from "declarations/types";
import {IForm} from "declarations/interfaces";

import {useForm} from "hooks/useForm.ts";
import {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import ProfileOrders from "./ProfileOrders.tsx";
import ProfileMenu from "./ProfileMenu.tsx";

import {Loader} from "components/index.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";


export default function ProfilePage() {


    // --------------- VARS & STATES ---------------

    const authStatus = useSelector(state => state.authSlice.status);
    const userData = useSelector(state => state.authSlice.userData);
    const dispatch = useDispatch();

    // --------------- FORM HOOKS
    const {values, handleChange, setValues} = useForm<IForm>({});
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
    // --------------- LOADER CONDITION
    const renderCondition = useSelector(state => state.orderFeed.orders).orders.length !== 1;


    // --------------- BUTTON APPEARANCE ---------------

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

    //  --------------- LOADER ---------------

    if (!userData || (authStatus === 'loading') && renderCondition) {
        return <Loader description={'Загрузка Ваших заказов...'}/>;
    }

    return (
        <section className={styles.profile_section}>

            <ProfileMenu/>

            <div className={styles.profile_content}>

                {location.pathname === '/profile/orders' ? <ProfileOrders/> :
                    <form className={styles.profile_form}>
                        <div>
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
                        </div>
                    </form>
                }

            </div>

        </section>
    )
}