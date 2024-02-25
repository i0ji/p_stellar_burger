import styles from "pages/Pages.module.scss"

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {resetPassword} from "utils/api.ts";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ResetPage() {

    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleSavePassword = async () => {
        try {
            const response = await resetPassword(password, token);

            if (response.success) {
                console.log('Password successfully reset:', response.success);
                console.log('Password successfully reset:', response.message);
                navigate('/reset-success');
                // --------------- PWD RESET
            } else {
                console.error('Ошибка при восстановлении пароля:', response.message);
                // --------------- ERROR HANDLE
            }
        } catch (error) {
            console.error('Ошибка при восстановлении пароля:', error);
            // --------------- ERROR HANDLE
        }
    };


    return (
        <section className={styles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6">Смена пароля</h1>
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    icon={undefined}
                    value={password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={(e) => setToken(e.target.value)}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    icon={undefined}
                    value={token}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    onClick={handleSavePassword}
                    htmlType="button"
                    extraClass="mb-20"
                    type="primary">
                    Сохранить
                </Button>

                {/*<p>Вспомнили пароль? <Link to="/login">Войти</Link></p>*/}
            </form>
        </section>
    );
}