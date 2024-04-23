import styles from "./ProfilePage.module.scss";

import {getUserData, updateUserData} from "utils/api.ts";

import {TInputElementType} from "declarations/types";
import {IForm} from "declarations/interfaces";

import {useForm} from "hooks/useForm.ts";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import ProfileOrders from "./ProfileOrders.tsx";
import ProfileMenu from "./ProfileMenu.tsx";

import {Loader, Transitions} from "components/index.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";


export default function ProfilePage() {


    // --------------- VARS & STATES ---------------

    const authStatus = useSelector(state => state.authSlice.status),
        userData = useSelector(state => state.authSlice.userData),
        dispatch = useDispatch(),

        // --------------- FORM HOOKS
        {values, handleChange, setValues} = useForm<IForm>({}),
        [showUpdateButtons, setShowUpdateButtons] = useState<boolean>(false),
        [isEditing, setIsEditing] = useState<boolean>(false),
        [editingField, setEditingField] = useState<string | null>(null),
        [editedValues, setEditedValues] = useState<{
            name: string | null;
            password: string | null;
            email: string | null;
        }>
        ({
            name: null,
            password: null,
            email: null
        }),
        nameInputRef = useRef<TInputElementType>(null),
        emailInputRef = useRef<TInputElementType>(null),
        passwordInputRef = useRef<TInputElementType>(null),
        // --------------- LOADER CONDITION
        renderCondition = useSelector(state => state.orderFeed.orders).orders.length !== 1;


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
        },
        //  --------------- SAVE DATA
        handleSave = async () => {
            if (editingField) {
                const updatedValues = {...editedValues, [editingField]: values[editingField]};
                setEditedValues(updatedValues);
                dispatch(getUserData());
                dispatch(updateUserData({[editingField]: values[editingField]}));
                setEditingField(null);
                setIsEditing(false);
                setShowUpdateButtons(false);
            }
        },

        //  --------------- CANCEL CHANGE
        handleCancel = () => {
            setShowUpdateButtons(false);
            setTimeout(() => {
                setEditingField(null);
                setIsEditing(false);
            }, 250);
        };

    //  --------------- LOADER ---------------

    if (!userData || (authStatus === 'loading') && renderCondition) {
        return <Loader description="Загрузка Ваших заказов..."/>;
    }

    return (
        <Transitions>
            <section
                className={styles.profile_section}
                data-testid="profile_section"
            >

                <ProfileMenu/>


                <div className={styles.profile_content}>
                    {location.pathname === '/profile/orders' ?
                        <ProfileOrders/>
                        :
                        <Transitions>
                            <form className={styles.profile_form}>
                                <div>
                                    <Input
                                        error={false}
                                        errorText="Ошибка"
                                        extraClass="mb-6"
                                        icon={(editingField == 'name') ? undefined : 'EditIcon'}
                                        name="name"
                                        onChange={handleChange}
                                        onIconClick={() => handleEditIconClick('name')}
                                        placeholder="Имя"
                                        ref={nameInputRef}
                                        size="default"
                                        type="text"
                                        value={(editingField === 'name') ? (values.name || '') : (editedValues.name || userData.name) ?? ''}
                                    />

                                    <Input
                                        error={false}
                                        errorText="Ошибка"
                                        extraClass="mb-6"
                                        icon={(editingField == 'email') ? undefined : 'EditIcon'}
                                        name="email"
                                        onChange={handleChange}
                                        onIconClick={() => handleEditIconClick('email')}
                                        placeholder="Почта"
                                        ref={emailInputRef}
                                        size="default"
                                        type="text"
                                        value={(editingField === 'email') ? (values.email || '') : (editedValues.email || userData.email) ?? ''}
                                    />

                                    <Input
                                        error={false}
                                        errorText="Ошибка"
                                        extraClass="mb-6"
                                        icon={(editingField == 'password') ? undefined : 'EditIcon'}
                                        name="password"
                                        onChange={handleChange}
                                        onIconClick={() => handleEditIconClick('password')}
                                        placeholder="Пароль"
                                        ref={passwordInputRef}
                                        size="default"
                                        type="text"
                                        value={((editingField == 'password') && values.password || '') ?? ''}
                                    />

                                    {
                                        isEditing && editingField ? <div
                                            className={`${styles.profile_update_button} ${showUpdateButtons ? styles.fadeIn : styles.fadeOut}`}
                                        >
                                            <Button
                                                htmlType="button"
                                                onClick={handleSave}
                                                size="medium"
                                                type="primary"
                                            >
                                                Сохранить
                                            </Button>

                                            <Button
                                                htmlType="button"
                                                onClick={handleCancel}
                                                size="medium"
                                                type="secondary"
                                            >
                                                Отмена
                                            </Button>
                                        </div> : null
                                    }
                                </div>
                            </form>
                        </Transitions>
                    }

                </div>
            </section>
        </Transitions>
    )
}