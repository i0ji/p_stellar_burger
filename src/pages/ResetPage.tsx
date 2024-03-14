import styles from "pages/Pages.module.scss"

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {resetPassword} from "utils/api.ts";

import React, {useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";

export default function ResetPage() {


    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // --------------- PWD VISIBILITY  ---------------
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'token') {
            setToken(value);
        }
    }, []);

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        resetPassword(password, token)
            .then((response) => {
                if (response.success) {
                    console.log('Пароль восстановлен:', response.success);
                    console.log('Пароль васстоновлен:', response.message);
                    navigate('/reset-success');
                } else {
                    console.error('Ошибка при восстановлении пароля:', response.message);
                }
            })
            .catch((error) => {
                console.error('Ошибка при восстановлении пароля:', error);
            });
    };


    return (
        <section className={styles.section}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSavePassword(e);
            }}>
                <h1 className="text text text_type_main-medium pb-6">Смена пароля</h1>
                <Input
                    onChange={handleChange}
                    type={isPasswordShow ? 'text' : 'password'}
                    placeholder={'Введите новый пароль'}
                    icon={'ShowIcon'}
                    name={'password'}
                    value={password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                    onIconClick={togglePasswordVisibility}
                />
                <Input
                    onChange={handleChange}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    icon={undefined}
                    name={'token'}
                    value={token}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    extraClass="mb-20"
                    type="primary">
                    Сохранить
                </Button>
            </form>
        </section>
    );
}