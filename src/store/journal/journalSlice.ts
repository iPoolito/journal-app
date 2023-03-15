import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/Notes";



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
    },
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
        },
        setNotes: (state, action) => {
            state.notes = action.payload

        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        }

    }
})
//Action creator functions
export const { addNewEmptyNote, setActiveNote, setNotes, deleteNoteById, setSaving, savingNewNote, updateNote } = journalSlice.actions