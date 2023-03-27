import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/Notes";

type initialState = {
    isSaving: boolean,
    messageSaved: string,
    notes: Note[],
    active: Note | null
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [] as Note[],
        active: null
        // active: {
        //     id: '1234',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: []
        // }
    } as initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            const note = action.payload
            state.notes.push(note)
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload

        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })

            state.messageSaved = `${action.payload.title}, actualizada correctamente`
            //Todo: Mostrar mensaje de actualizacion

        },
        setPhotosToActiveNote: (state, action) => {
            state.active!.imageUrls = [...state.active?.imageUrls as [], ...action.payload]
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {

        }

    }
})
//Action creator functions
export const { addNewEmptyNote, setActiveNote, setNotes, deleteNoteById, setSaving, savingNewNote, updateNote, setPhotosToActiveNote } = journalSlice.actions