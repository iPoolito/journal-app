import { useMemo } from "react";
import { Note } from "../types/Notes";

export default function SideBarItem({ title, body }: Note) {
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title;
    }, [title])
    return (
        <div >
            <h2>{newTitle}</h2>
            <p>{body}</p>
        </div>
    )
}