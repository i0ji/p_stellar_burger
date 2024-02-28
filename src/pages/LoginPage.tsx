import React from "react";

import styles from "pages/Pages.module.scss"

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useNavigate} from "react-router-dom";
import {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUser} from "slices/authSlice.ts";
import {useForm} from "hooks/useForm.ts";
import {IUserData} from "interfaces/sliceInterfaces";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.authSlice);
    const {values, handleChange} = useForm({});

    const handleLogin = () => {
        const userData: IUserData = {
            email: values.email,
            password: values.password,
        };
        dispatch(getUser(userData));
    };

    useEffect(() => {
            const handleSuccessfulLogin = () => {
                console.log('Авторизация прошла успешно');
                console.log('Получен accessToken:', authState.accessToken);
                console.log('Получен refreshToken:', authState.refreshToken);
                navigate('/');
            }

            if (authState.status === 'succeeded') {
                handleSuccessfulLogin();
            } else if (authState.status === 'failed') {
                console.error('Ошибка авторизации:', authState.error); // Log or display the error
                navigate('/warning');
            }
        }, [authState.status, authState.accessToken, authState.refreshToken, authState.error, navigate]
    )

    return (
        <section className={styles.section}>
            <form>
                <Fragment></Fragment>
                <h1 className="text text text_type_main-medium pb-6">Вход</h1>
                <Input
                    onChange={handleChange}
                    name={'email'}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    value={values.email ?? ''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={handleChange}
                    name={'password'}
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={values.password ?? ''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    extraClass="mb-20"
                    type="primary"
                    onClick={handleLogin}
                >
                    Войти
                </Button>

                <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>

                <p>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></p>
            </form>
        </section>
    );
};

export default React.memo(LoginPage);