import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
        messageSaved: '',
        notes: [],
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
        addNewEmptyNote: (state, action) => {

        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {

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
export const { addNewEmptyNote, setActiveNote, setNotes, deleteNoteById, setSaving, updateNote } = journalSlice.actions