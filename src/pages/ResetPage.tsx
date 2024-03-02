import styles from "pages/Pages.module.scss"

import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {resetPassword} from "slices/authSlice.ts";

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "hooks/useForm.ts";

export default function ResetPage() {


    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {values, handleChange} = useForm({});


    // --------------- PWD VISIBILITY  ---------------
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordShow(!isPasswordShow);
    };

    console.log(values.token);
    console.log(values.password);
    console.log(values);


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
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSavePassword();
            }}>
                <h1 className="text text text_type_main-medium pb-6">Смена пароля</h1>
                <Input
                    // onChange={handleChange}
                    onChange={(e) => setPassword(e.target.value)}
                    type={isPasswordShow ? 'text' : 'password'}
                    placeholder={'Введите новый пароль'}
                    icon={'ShowIcon'}
                    name={'password'}
                    value={password}
                    // value={values.password ?? ''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                    onIconClick={togglePasswordVisibility}
                />
                <Input
                    onChange={(e) => setToken(e.target.value)}
                    // onChange={handleChange}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    icon={undefined}
                    name={'token'}
                    value={token}
                    // value={values.token ?? ''}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button
                    htmlType="submit"
                    extraClass="mb-20"
                    type="primary">
                    Сохранить
                </Button>
            </form>
        </section>
    );
}