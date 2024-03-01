import styles from "./Pages.module.scss"

import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {registerUser} from "slices/authSlice.ts";

import {useDispatch} from "react-redux";
import {useForm} from "hooks/useForm.ts";

export default function RegisterPage() {

    const dispatch = useDispatch();
    const {values, handleChange} = useForm({});


    const isSuccessResponse = (response: unknown): response is { payload: { success: boolean } } =>
        typeof response === 'object' && response !== null && 'payload' in response && 'success' in response.payload;

    const getErrorMessage = (error: unknown): string =>
        typeof error === 'string' ? error : 'An unknown error occurred';

    const handleRegister = () => {
        try {
            dispatch(registerUser(values))
                .then((response) => {
                    if (isSuccessResponse(response)) {
                        console.log('Пользователь успешно зарегистрирован:', response.payload.message);
                        // Add any additional logic or redirect the user if needed
                    } else {
                        console.error('Ошибка при регистрации:', getErrorMessage(response));
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при регистрации:', getErrorMessage(error));
                    // Handle error actions if needed
                });
        } catch (error) {
            console.error('Ошибка при регистрации:', getErrorMessage(error));
            // Handle error actions if needed
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
                    name={'email'}
                    value={values.email ?? ''}
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
                    name={'password'}
                    value={values.password ?? ''}
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
                    name={'name'}
                    value={values.name ?? ''}
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