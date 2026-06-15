import { Navigate } from "react-router"
import { useAuth } from "../../lib/hook/auth-hook"
import type { ReactNode } from "react"

export default function CheckLogin({children}: Readonly<{children: ReactNode}>) {
    const {loggedInUser} = useAuth()

    if(!loggedInUser){
        return <Navigate to="/"/>
    } else {
        return children
    }
}