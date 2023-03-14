import { Dispatch } from "@reduxjs/toolkit"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { RootState } from "../store"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice"



export const startNewNote = () => {

    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(savingNewNote())
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            id: ''
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }

}