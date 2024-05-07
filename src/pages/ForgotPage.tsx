import styles from "pages/Pages.module.scss";

import {forgotPassword} from "utils/api.ts";

import {IForm} from "declarations/interfaces";

import {Transition} from "components/index.ts";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {Link, useNavigate} from "react-router-dom";
import {useForm} from "hooks/useForm.ts";
import {useDispatch} from "hooks/reduxHooks.ts";

export default function ForgotPage() {
    const {values, handleChange} = useForm<IForm>({}),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        handleForgotPassword = async () => {
            const action = dispatch(forgotPassword(values.email));
            navigate("/reset-password");
            return action.payload;
        };

    return (
        <Transition>
            <section className={styles.section}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        void handleForgotPassword();
                    }}
                >
                    <h1 className="text text text_type_main-medium pb-6">
                        Восстановить пароль
                    </h1>

                    <Input
                        error={false}
                        errorText="Ошибка"
                        extraClass="mb-6"
                        icon={undefined}
                        name="email"
                        onChange={handleChange}
                        placeholder="E-mail"
                        size="default"
                        type="text"
                        value={values.email ?? ``}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />

                    <Button extraClass="mb-20" htmlType="submit" type="primary">
                        Восстановить
                    </Button>

                    <p>
                        Вспомнили пароль?
                        <Link to="/login">&nbsp;Войти</Link>
                    </p>
                </form>
            </section>
        </Transition>
    );
}
