import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { startCreatingUserWithEmailPassword } from "../store/auth/thunks";

const formData = {
    email: '',
    password: '',
    displayName: ''
}



const formValidations = {

    email: [(value: string) => value.includes('@'), 'Email should have @'],
    password: [(value: string) => value.length >= 6, 'Password shoul have 6 characters'],
    displayName: [(value: string) => value.length >= 1, 'Name is required']

}

export default function Register() {
    const dispatch = useAppDispatch()


    const [formSubmited, setFormSubmitred] = useState(false)



    const { status } = useAppSelector(state => state.auth)
    const { formState, displayName, email, password, onInputChange, displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations)
    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setFormSubmitred(true)

        if (!isFormValid) return
        dispatch(startCreatingUserWithEmailPassword({ email, password, displayName }))

        // dispatch(checkingAuthentication({ email, password }));
    }


    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1>Form Valid {isFormValid ? 'Validio' : 'Incorrecto'}</h1>
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={onSubmit}>


                        <div>
                            <label
                                htmlFor="displayName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="displayName"
                                    name="displayName"
                                    type="text"
                                    autoComplete="displayName"
                                    // required
                                    onChange={onInputChange}
                                    value={displayName}
                                    className={!displayNameValid ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"}
                                />
                                {displayNameValid && formSubmited && <p className="text-red-500">{displayNameValid}</p>}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="email@gmail.com"
                                    // required
                                    className={!emailValid ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"}
                                    onChange={onInputChange}
                                    value={email}
                                />
                                {emailValid && formSubmited && <p className="text-red-500">{emailValid}</p>}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    // required
                                    onChange={onInputChange}
                                    value={password}
                                    className={!passwordValid ? "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" : "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"}
                                />
                                {passwordValid && formSubmited && <p className="text-red-500">{passwordValid}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/auth/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Already have an account? login
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isAuthenticating}
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}