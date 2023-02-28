import { async } from "@firebase/util"
import { Dispatch } from "@reduxjs/toolkit"
import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials } from "./authSlice"

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
        console.log({ result })
    }
}