import React, {useState} from "react";

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState(inputValues),
        handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {value, name} = event.target;
            setValues(prevValues => ({...prevValues, [name]: value}));
        };

    return {values, handleChange, setValues};
}
