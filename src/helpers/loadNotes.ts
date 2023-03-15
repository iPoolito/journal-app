import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"


export const loadNotes = async (uid: string) => {
    if (!uid) throw new Error('uid of the user doesnt exist.')

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(collectionRef)
    const notes: any = []
    docs.forEach(doc => {
        notes.push({ ...doc.data(), id: doc.id })
    })
    console.log(notes)
    return notes

}