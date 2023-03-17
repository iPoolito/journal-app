import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import type { RegisterPayload } from "../types/Register";


const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
        const { displayName, email, photoURL, uid } = user
        return {
            ok: true,
            //User Info
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as Error).message
        }
    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName }: RegisterPayload) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = result.user
        if (FirebaseAuth.currentUser) {
            await updateProfile(FirebaseAuth.currentUser, { displayName });
        }

        return {
            ok: true,
            //User Info
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as Error).message
        }
    }
}

export const signInWithEmailPassword = async ({ email, password }: Omit<RegisterPayload, "displayName">) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, uid, photoURL } = result.user
        return {
            ok: true,
            displayName,
            uid,
            email,
            photoURL
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as Error).message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}