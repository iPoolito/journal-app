import { useMemo } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setActiveNote } from "../store/journal";
import { Note } from "../types/Notes";

export default function SideBarItem({ title, body, date, id, imageUrls = [] }: Note) {
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title;
    }, [title])

    const dispatch = useAppDispatch()
    const handleSelectedNote = () => {
        dispatch(setActiveNote({ title, body, date, id, imageUrls }))
    }
    return (
        <div onClick={handleSelectedNote}>
            <h2>{newTitle}</h2>
            <p>{body}</p>
        </div>
    )
}