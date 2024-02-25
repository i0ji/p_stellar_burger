import styles from "pages/Pages.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {registerUser} from "utils/api.ts";

import {useForm} from "hooks/useForm.ts";


export default function RegisterPage() {

    const {values, handleChange} = useForm({});

    const handleRegister = async () => {
        try {
            const response = await registerUser(values);

            if (response.success) {
                console.log('Пользователь успешгл зарегистрировался:', response.message);
                // --------------- SUCCESS REGISTER
            } else {
                console.error('Ошибка при регистрации:', response.message);
                // --------------- ERROR HANDLE
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            // --------------- ERROR HANDLE
        }
    };

    return (
        <section className={styles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6">Регистрация</h1>
                <Input
                    onChange={handleChange}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    value={values.email}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={handleChange}
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={values.password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={handleChange}
                    type={'text'}
                    placeholder={'Имя'}
                    icon={undefined}
                    value={values.name}
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