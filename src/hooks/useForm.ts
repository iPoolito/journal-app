import React, { useState } from 'react';

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm) as any;

    const onInputChange = ({ target }: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = target as HTMLInputElement;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}