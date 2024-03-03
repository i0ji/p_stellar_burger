import { useState } from "react";

export function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues((prevValues) => {
            return { ...prevValues, [name]: value };
        });
    };

    const toggleEditing = () => {
        setIsEditing((prevEditing) => !prevEditing);
    };

    return { values, isEditing, handleChange, toggleEditing, setValues };
}