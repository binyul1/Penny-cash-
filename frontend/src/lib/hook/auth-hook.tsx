import { useContext } from "react"
import AuthContext from "../../contex/AuthContext"

export const useAuth = () => {
    const authContext = useContext (AuthContext)

    return{
        ...authContext
    }
}