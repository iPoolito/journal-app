import type { RegisterPayload } from "../../types/Register"
import { Dispatch } from "@reduxjs/toolkit"
import { signInWithGoogle, registerUserWithEmailPassword } from "../../firebase/providers"
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

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: RegisterPayload) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, password, email });
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))

    }
}