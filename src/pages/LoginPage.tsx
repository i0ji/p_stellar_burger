import styles from "pages/Pages.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {useForm} from "hooks/useForm.ts";

export default function LoginPage() {


    const {values, handleChange} = useForm({});


    return (
        <section className={styles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6">Вход</h1>
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
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={values.password}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
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