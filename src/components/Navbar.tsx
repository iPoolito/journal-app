import { Link } from "react-router-dom"
import { useCheckAuth } from "../hooks"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { startLogout } from "../store/auth/thunks"


const url = [
    {
        href: "/",
        name: 'home'
    },
    {
        href: "/auth/login",
        name: 'login'
    },
    {
        href: "/auth/register",
        name: 'register'
    }
]

export default function Navbar() {
    const status = useCheckAuth()
    const { displayName } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <nav>
            <ul className="flex items-center justify-between w-full ">

                {status === 'authenticated'
                    ? <>
                        <li> Welcome {displayName}</li>
                        <li onClick={handleLogout}> Logout</li>
                    </>
                    : <>
                        {url.map(element => (
                            <Link key={`${element.name}`} to={`${element.href}`}>{element.name} </Link>
                        ))}
                    </>
                }
            </ul>
        </nav>
    )
}