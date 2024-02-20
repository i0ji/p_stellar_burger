import styles from "pages/FormsPage.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ForgotPage() {
    return (
        <section className={styles.section}>
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
                <Button
                    htmlType="button"
                    extraClass="mb-20"
                    type="primary">
                    Восстановить
                </Button>

                <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
            </form>
        </section>
    );
}