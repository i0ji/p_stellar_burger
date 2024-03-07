import styles from "pages/Pages.module.scss"

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {loginUser} from "utils/api.ts";
import {useForm} from "hooks/useForm.ts";
import {IUserData} from "declarations/sliceInterfaces";

function LoginPage() {

    const dispatch = useDispatch();
    const {values, handleChange} = useForm({});

    // --------------- PWD VISIBILITY  ---------------

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData: IUserData = {
            email: values.email,
            password: values.password,
        };

        dispatch(loginUser(userData));
    };

    return (
        <section className={styles.section}>
            <form onSubmit={handleLogin}>
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
                    type={isPasswordShow ? 'text' : 'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={values.password ?? ''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                    onIconClick={togglePasswordVisibility}
                />
                {/*{*/}
                {/*    errorMessage && <p*/}
                {/*        className="pb-6"*/}
                {/*        style={{color: '#b90101'}}*/}
                {/*    >*/}
                {/*        Ошибка {errorMessage}. Попробуйте ещё раз.*/}
                {/*    </p>*/}
                {/*}*/}
                <Button
                    htmlType="submit"
                    extraClass="mb-20"
                    type="primary"
                >
                    Войти
                </Button>

                <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>

                <p>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></p>
            </form>
        </section>
    );
}

export default React.memo(LoginPage);