import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";



export default function InputField() {
    return (
        <Input
            onChange={handleChange}
            name={'email'}
            type={'text'}
            placeholder={'E-mail'}
            icon={undefined}
            value={values.email ?? ''}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
        />
    )
}