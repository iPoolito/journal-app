import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import CheckingAuth from "../components/CheckingAuth";
import { FirebaseAuth } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { login, logout } from "../store/auth";

export function AppRouter() {
  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout(null))
      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL }))
    })
  }, [])

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
      {
        (status === 'authenticated')
          ?
          <Route path="/*" element={<JournalRoutes />} />
          :
          <Route path="/auth/*" element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
}
