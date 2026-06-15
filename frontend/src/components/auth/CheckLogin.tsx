import { Navigate } from "react-router"
import { useAuth } from "../../lib/hook/auth-hook"
import type { ReactNode } from "react"


export const CheckPermission = ({
  allowed,
  children,
}: Readonly<{ allowed: string; children: ReactNode }>) => {
  const { loggedInUser } = useAuth();

  if (loggedInUser && loggedInUser.role === allowed) {
    return children;
  } else {
    return <></>;
  }
};

export default function CheckLogin({children, allowed}: Readonly<{children: ReactNode, allowed:string}>) {
    const {loggedInUser} = useAuth()

    if(!loggedInUser){
        return <Navigate to="/" />
    } else if (loggedInUser && loggedInUser.role !== allowed) {
        return <Navigate to={`/${loggedInUser.role}`} />
    } else {
        return children
    }
} 