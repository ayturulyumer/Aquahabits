import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues)


    // It also trims the newly set value to prevent empty spaces
    const changeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value.trim() }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values)
    }


    return {
        values,
        changeHandler,
        onSubmit,
    }
}