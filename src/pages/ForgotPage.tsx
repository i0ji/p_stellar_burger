import styles from "pages/Pages.module.scss";

import {forgotPassword} from "utils/api.ts";

import {IForm} from "declarations/interfaces";

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useNavigate} from "react-router-dom";
import {useForm} from "hooks/useForm.ts";
import {useDispatch} from "hooks/reduxHooks.ts";

export default function ForgotPage() {

    const {values, handleChange} = useForm<IForm>({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        const action = dispatch(forgotPassword(values.email));
        navigate('/reset-password');
        return action.payload;
    }

    return (
        <section className={styles.section}>
            <form onSubmit={(e) => {
                e.preventDefault();
                void handleForgotPassword();
            }}>
                <h1 className="text text text_type_main-medium pb-6">Восстановить пароль</h1>
                <Input
                    onChange={handleChange}
                    value={values.email ?? ``}
                    name={'email'}
                    type={'text'}
                    placeholder={'E-mail'}
                    icon={undefined}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    extraClass="mb-20"
                    type="primary">
                    Восстановить
                </Button>

                <p>Вспомнили пароль?
                    <Link
                        to="/login"
                    >&nbsp;Войти</Link></p>
            </form>
        </section>
    );
}