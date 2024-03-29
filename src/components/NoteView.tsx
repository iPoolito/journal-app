import { useEffect, useMemo, useRef } from "react"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../hooks"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../store/journal"
import ImageGallery from "./ImageGallery"

interface HTMLInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}


export default function NoteView() {
    const dispatch = useAppDispatch()
    const { active: note, messageSaved, isSaving } = useAppSelector(state => state.journal)
    let initialState = {}
    if (note) initialState = note
    const { body, title, date, onInputChange, formState } = useForm(initialState)

    const inputRef = useRef<any>(null)

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota acutalizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const dateString = useMemo(() => {
        const newDate = new Date(date!);
        return newDate.toUTCString()
    }, [date])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = (event: HTMLInputEvent) => {
        const files = event.target.files
        if (files?.length === 0) return
        dispatch(startUploadingFiles(files))
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote())
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">       {dateString}</h3>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2 flex rounded-md shadow-sm">

                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title!}
                                    onChange={onInputChange}
                                    autoComplete="title"
                                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">
                                Body
                            </label>
                            <div className="mt-2">
                                <input
                                    id="body"
                                    name="body"
                                    value={body!}
                                    onChange={onInputChange}
                                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"

                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                        </div>

                        <div className="sm:col-span-6">
                            <button
                                onClick={onDeleteNote}
                                type="button"
                                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Borrar Nota
                            </button>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                        onClick={() => inputRef.current.click()}
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={onFileInputChange} disabled={isSaving} ref={inputRef} />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className=" col-span-6">
                            <ImageGallery images={note?.imageUrls} />
                        </div>
                    </div>
                </div>
            </div>
            {/* CANCEL AND SAVE BUTTONS */}
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isSaving}
                        type="button"
                        onClick={onSaveNote}
                        className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}