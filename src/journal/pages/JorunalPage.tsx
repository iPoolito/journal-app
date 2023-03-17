import NoteView from "../../components/NoteView";
import NothingSelected from "../../components/NothinSelected";
import SideBar from "../../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { startNewNote } from "../../store/journal";

export function JournalPage() {
  const dispatch = useAppDispatch()
  const { isSaving, active } = useAppSelector(state => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <div className="flex h-screen w-full mt-10">
      <SideBar />
      <div className="px-10 flex flex-col gap-10 py-10">
        <h1 className="text-3xl font-bold underline">Journal Page</h1>
        {active ? <NoteView /> : <NothingSelected />}
        <div>
          <button
            onClick={onClickNewNote}
            type="button"
            disabled={isSaving}
            className={`rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isSaving && 'bg-gray-300 hover:bg-gray-500'}`}
          >
            Add Note
          </button>

        </div>

      </div>
    </div>
  );
}
