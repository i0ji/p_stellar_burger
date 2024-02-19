import loginPage from "./LoginPage.module.scss"

import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

export default function LoginPage() {
    return (
        <section className={loginPage.login_section}>
            <form>
                <h1 className="text text text_type_main-medium">Вход</h1>
                <Input
                    onChange={() => {
                        console.log('INPUT 1')
                    }}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    value={'xxx'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <h3>hello</h3>
                <Input
                    onChange={() => {
                        console.log('INPUT 1')
                    }}
                    type={'text'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    value={'hello'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Button
                type="primary"/>
            </form>
        </section>
    );
}