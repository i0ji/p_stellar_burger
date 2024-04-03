import styles from "pages/Pages.module.scss"

import {loginUser} from "utils/api.ts";

import {IUserData} from "declarations/interfaces";
import {IForm} from "declarations/interfaces";

import {Loader} from "components/index.ts";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useForm} from "hooks/useForm.ts";

export default function LoginPage() {

    const {values, handleChange} = useForm<IForm>({});
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.authSlice.isAuth);


    //  --------------- RERENDER CHECK ---------------

    const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current += 1;
    });
    console.log(`Rerender counter: ${renderCount.current}`)


    // --------------- PWD VISIBILITY  ---------------

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow);
    };


    // --------------- ERROR MESSAGE ---------------

    const loginError = useSelector(state => state.authSlice.loginError);
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData: IUserData = {
            email: values.email,
            password: values.password,
        };
        dispatch(loginUser(userData));
    };

    if (userAuth) {
        return <Loader/>;
    }

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
                {
                    loginError && <p
                        className="pb-6"
                        style={{color: '#b90101'}}
                    >
                        Ошибка. Попробуйте ещё раз.
                    </p>
                }
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