import {useState} from "react";

export function useForm(inputValues: { [key: string]: string }) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
        const {value, name} = event.target;
        setValues((prevValues) => {
            return {...prevValues, [name]: value};
        });
    };

    return {values, handleChange, setValues}
}
