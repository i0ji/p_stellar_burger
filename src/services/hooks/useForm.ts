import React, {useState} from "react";

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues((prevValues) => {
            return {...prevValues, [name]: value};
        });
    };

    return {values, handleChange, setValues}
}

// import React, { useState, useCallback, useMemo } from "react";

// export function useForm<T>(inputValues: T) {
//     const [values, setValues] = useState(inputValues);
//
//     const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         const { value, name } = event.target;
//         setValues((prevValues) => {
//             return { ...prevValues, [name]: value };
//         });
//     }, []);
//
//     const memoizedValues = useMemo(() => values, [values]);
//
//     return { values: memoizedValues, handleChange, setValues };
// }
