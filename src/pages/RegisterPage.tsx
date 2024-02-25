import styles from "pages/Pages.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {registerUser} from "utils/registerUser.ts";

import {useState} from "react";


export default function RegisterPage() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser(email, password, name);

            if (response.success) {
                console.log('User successfully registered:', response.message);
                // --------------- SUCCESS REGISTER
            } else {
                console.error('Error during user registration:', response.message);
                // --------------- ERROR HANDLE
            }
        } catch (error) {
            console.error('Error during user registration:', error);
            // --------------- ERROR HANDLE
        }
    };

    return (
        <section className={styles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6">Регистрация</h1>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    value={email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={(e) => setName(e.target.value)}
                    type={'text'}
                    placeholder={'Имя'}
                    icon={undefined}
                    value={name}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    onClick={handleRegister}
                    htmlType="button"
                    extraClass="mb-20"
                    type="primary">
                    Зарегистрироваться
                </Button>

                <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
            </form>
        </section>
    );
}