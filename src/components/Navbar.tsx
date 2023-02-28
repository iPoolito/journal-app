import { Link } from "react-router-dom"


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
    return (
        <nav>
            <ul className="flex items-center justify-between w-full ">
                {url.map(element => (
                    <Link key={`${element.name}`} to={`${element.href}`}>{element.name} </Link>
                ))}
            </ul>
        </nav>
    )
}