import { Dispatch } from "@reduxjs/toolkit"
import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./authSlice"

type AuthProps = {
    email: string,
    password: string
}


export const checkingAuthentication = ({ email, password }: AuthProps) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))

    }
}