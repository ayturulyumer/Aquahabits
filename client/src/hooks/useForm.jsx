import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues)



    const whitespaceRegex = /\s+/g

    // i'm replacing all the white spaces with empty space here, cause i don't want to manually do it in every component - IDK if it's a good practice
    const changeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value.replace(whitespaceRegex, "") }))
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