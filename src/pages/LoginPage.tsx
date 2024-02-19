import loginFormStyles from "pages/FormsPage.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

export default function LoginPage() {
    return (
        <section className={loginFormStyles.section}>
            <form>
                <h1 className="text text text_type_main-medium pb-6">Вход</h1>
                <Input
                    onChange={() => {
                        console.log('INPUT 1')
                    }}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    value={''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    onChange={() => {
                        console.log('INPUT 1')
                    }}
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="button"
                    extraClass="mb-20"
                    type="primary">
                    Войти
                </Button>

                <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>

                <p>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль</Link></p>
            </form>
        </section>
    );
}