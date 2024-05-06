import styles from "pages/Pages.module.scss"

import {loginUser} from "utils/api.ts";
import checkEmail from "utils/checkEmail.ts";

import {IUserData} from "declarations/interfaces";
import {IForm} from "declarations/interfaces";

import {Loader, Transitions} from "components/index.ts";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import React, {useState} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useForm} from "hooks/useForm.ts";

export default function LoginPage() {

    const {values, handleChange} = useForm<IForm>({}),

        [emailError, setEmailError] = useState<boolean>(false),
        [loginError, setLoginError] = useState<boolean>(false),

        stateLoginError = useSelector(state => state.authSlice.loginError),

        dispatch = useDispatch(),
        userAuth = useSelector(state => state.authSlice.isAuth),

        //  --------------- RERENDER CHECK ---------------

        // const renderCount = useRef(0);
        // useEffect(() => {
        //     renderCount.current += 1;
        // });
        // console.log(`Rerender counter: ${renderCount.current}`)


        // --------------- PWD VISIBILITY  ---------------

        [isPasswordShow, setIsPasswordShow] = useState(false),
        togglePasswordVisibility = () => {
            setIsPasswordShow(!isPasswordShow);
        },


        // --------------- ERROR MESSAGE ---------------


        handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            checkEmail(values.email) ? setEmailError(true) : setEmailError(false);

            stateLoginError && setLoginError(true);

            const userData: IUserData = {
                email: values.email,
                password: values.password,
            };

            dispatch(loginUser(userData));
        };


// --------------- CONDITION ---------------

    if (userAuth) {
        return <Loader description={'Проходим фейсконтроль...'}/>;
    }


// --------------- MARKUP ---------------

    return (
        <Transitions>
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
                        !emailError && loginError && <p
                            className="pb-6"
                            style={{color: '#b90101'}}
                        >
                            Неверный пароль или Email. Попробуйте ещё раз.
                        </p>
                    }
                    {
                        emailError && <p
                            className="pb-6"
                            style={{color: '#b90101'}}
                        >
                            Некорректный Email.
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
        </Transitions>
    );
}