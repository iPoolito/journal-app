import React, { useEffect, useMemo, useState } from 'react';

type FormValidations = {
    [key: string]: (string | ((value: string) => boolean))[]
}

type InitialForm = {
    [key: string]: string
}

type FormValues<T> = T & {
    [key: string]: string | null;
};

type HookFrom<T> = FormValues<T> & {
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
};

export const useForm = <T extends InitialForm>(
    initialForm: T = {} as T,
    formValidations: FormValidations = {}
): HookFrom<T> => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<FormValues<T>>({} as FormValues<T>);


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue]) return false
        }
        return true
    }, [formValidation])


    useEffect(() => {
        createValidators();
    }, [formState]);

    const onInputChange = ({ target }: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = target as HTMLInputElement;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckValues: Partial<FormValues<T>> = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            const key = `${formField}Valid` as keyof FormValues<T>; // cast key to keyof FormValues<T>

            if (typeof fn === "function" && fn(formState[formField])) {
                formCheckValues[key] = undefined;
            } else {
                formCheckValues[key] = errorMessage || "Este campo es requerido." as any;
            }
        }

        setFormValidation(formCheckValues as FormValues<T>);

    };
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    } as HookFrom<T>;
};
