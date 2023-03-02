import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../store/auth/thunks";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";

const formValidations = {

    email: [(value: string) => value?.includes('@'), 'Email should have @'],
    password: [(value: string) => value?.length >= 6, 'Password shoul have 6 characters'],
    displayName: [(value: string) => value?.length >= 1, 'Name is required']

}

export default function Login() {
    const dispatch = useAppDispatch()
    const { status, errorMessage } = useAppSelector(state => state.auth)
    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    }, formValidations)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={onInputChange}
                                    value={email}
                                />
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
                                    required
                                    onChange={onInputChange}
                                    value={password}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
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
                                    to="/auth/register"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Create an Account
                                </Link>
                            </div>
                        </div>

                        <div>
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <button
                                disabled={isAuthenticating}
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-6" hidden={isAuthenticating}>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid justify-center ">
                            <div onClick={onGoogleSignIn}>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="64" height="64"><defs><path id="A" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="B"><use xlinkHref="#A" /></clipPath><g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)"><path d="M0 37V11l17 13z" clip-path="url(#B)" fill="#fbbc05" /><path d="M0 11l17 13 7-6.1L48 14V0H0z" clip-path="url(#B)" fill="#ea4335" /><path d="M0 37l30-23 7.9 1L48 0v48H0z" clip-path="url(#B)" fill="#34a853" /><path d="M48 48L17 24l-4-3 35-10z" clip-path="url(#B)" fill="#4285f4" /></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}