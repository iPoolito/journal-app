import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { startNewNote } from "../../store/journal";

export function JournalPage() {
  const dispatch = useAppDispatch()
  const { isSaving } = useAppSelector(state => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }
  console.log(isSaving)
  return (
    <div className="px-10 flex flex-col gap-10 py-10">
      <h1 className="text-3xl font-bold underline">Journal Page</h1>
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
  );
}
