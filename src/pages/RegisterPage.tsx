import styles from "./Pages.module.scss"

import {registerUser} from "utils/api.ts";

import {IForm} from "declarations/interfaces";

import {Link} from "react-router-dom";
import {Transitions} from "components/index.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import React, {useState} from "react";
import {useDispatch} from "hooks/reduxHooks.ts";
import {useForm} from "hooks/useForm.ts";

export default function RegisterPage() {

    const dispatch = useDispatch(),
        {values, handleChange} = useForm<IForm>({}),
        [isPasswordShow, setIsPasswordShow] = useState(false),
        isFormEmpty = !values.email || !values.password || !values.name,

        // --------------- PWD VISIBILITY
        togglePasswordVisibility = () => {
            setIsPasswordShow(!isPasswordShow);
        },
        // --------------- REGISTER
        handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(registerUser(values));
        }

    return (
        <Transitions>
            <section className={styles.section}>

                <form
                    onSubmit={handleRegister}
                >
                    <h1 className="text text text_type_main-medium pb-6">
                        Регистрация
                    </h1>

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon={undefined}
                        name="email"
                        onChange={handleChange}
                        placeholder="E-mail"
                        size="default"
                        type="text"
                        value={values.email ?? ''}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon="ShowIcon"
                        name="password"
                        onChange={handleChange}
                        onIconClick={togglePasswordVisibility}
                        placeholder="Пароль"
                        size="default"
                        type={isPasswordShow ? 'text' : 'password'}
                        value={values.password ?? ''}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon={undefined}
                        name="name"
                        onChange={handleChange}
                        placeholder="Имя"
                        size="default"
                        type="text"
                        value={values.name ?? ''}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />

                    <Button
                        disabled={isFormEmpty}
                        extraClass="mb-20"
                        htmlType="submit"
                        type="primary"
                    >
                        Зарегистрироваться
                    </Button>

                    <p>
                        Уже зарегистрированы?
                        <Link to="/login">
                            &nbsp;Войти
                        </Link>
                    </p>
                </form>

            </section>
        </Transitions>
    );
}