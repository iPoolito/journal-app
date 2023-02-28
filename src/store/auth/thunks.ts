import { Dispatch } from "@reduxjs/toolkit"
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