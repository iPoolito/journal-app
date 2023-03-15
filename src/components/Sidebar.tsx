import { useAppSelector } from "../hooks/useAppDispatch"
import SideBarItem from "./SideBarItem"


export default function SideBar() {

    const { notes } = useAppSelector(state => state.journal)

    return (
        <div className="bg-red-200 w-1/4 flex flex-col items-center p-6 gap-6">
            {notes.map(note => (
                <SideBarItem key={note.id} {...note} />
            ))}
        </div>
    )
}