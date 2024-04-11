import styles from "pages/Pages.module.scss"

import {loginUser} from "utils/api.ts";
import checkEmail from "utils/checkEmail.ts";

import {IUserData} from "declarations/interfaces";
import {IForm} from "declarations/interfaces";

import {Loader} from "components/index.ts";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

import React, {useState} from "react";
import {useDispatch, useSelector} from "hooks/reduxHooks.ts";
import {useForm} from "hooks/useForm.ts";

export default function LoginPage() {

    const {values, handleChange} = useForm<IForm>({});
    const [emailError, setEmailError] = useState<string>("");
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.authSlice.isAuth);


    //  --------------- RERENDER CHECK ---------------

    // const renderCount = useRef(0);
    // useEffect(() => {
    //     renderCount.current += 1;
    // });
    // console.log(`Rerender counter: ${renderCount.current}`)


    // --------------- PWD VISIBILITY  ---------------

    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow);
    };


    // --------------- ERROR MESSAGE ---------------


    const loginError = useSelector(state => state.authSlice.loginError);
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values.email);
        if (checkEmail(values.email)) {
            setEmailError("ОШИБКА В ПОЧТЕ");
            return;
        } else {
            setEmailError('');
        }

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

    return (

        <section className={styles.section}>
            <form onSubmit={handleLogin}>
                <h1 className="text text text_type_main-medium pb-6">Вход</h1>
                <Input
                    data-testid="login_page_input_email"
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
                    data-testid="login_page_input_password"
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
                    data-testid="login_page_button_submit"
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