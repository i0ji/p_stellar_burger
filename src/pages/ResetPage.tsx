import styles from "pages/Pages.module.scss"

import {resetPassword} from "utils/api.ts";

import {Transitions} from "components/index.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ResetPage() {

    const [password, setPassword] = useState(''),
        [token, setToken] = useState(''),
        navigate = useNavigate(),

        // --------------- PWD VISIBILITY  ---------------
        [isPasswordShow, setIsPasswordShow] = useState(false),
        togglePasswordVisibility = () => {
            setIsPasswordShow(!isPasswordShow);
        },

        handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            if (name === 'password') {
                setPassword(value);
            } else if (name === 'token') {
                setToken(value);
            }
        }, []),

        handleSavePassword = (e: React.FormEvent) => {
            e.preventDefault();
            resetPassword(password, token)
                .then((response) => {
                    if (response.success) {
                        navigate('/reset-success');
                    } else {
                        console.error('Ошибка при восстановлении пароля:', response.message);
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при восстановлении пароля:', error);
                });
        };


    // --------------- MARKUP  ---------------

    return (
        <Transitions>
            <section className={styles.section}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSavePassword(e);
                }}
                >
                    <h1 className="text text text_type_main-medium pb-6">
                        Смена пароля
                    </h1>

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon="ShowIcon"
                        name="password"
                        onChange={handleChange}
                        onIconClick={togglePasswordVisibility}
                        placeholder="Введите новый пароль"
                        size="default"
                        type={isPasswordShow ? 'text' : 'password'}
                        value={password}
                    />

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon={undefined}
                        name="token"
                        onChange={handleChange}
                        placeholder="Введите код из письма"
                        size="default"
                        type="text"
                        value={token}
                    />

                    <Button
                        extraClass="mb-20"
                        htmlType="submit"
                        type="primary"
                    >
                        Сохранить
                    </Button>
                </form>

            </section>
        </Transitions>
    );
}