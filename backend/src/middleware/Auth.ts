import type { Request, Response, NextFunction } from "express"

const AuthCheck = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("i am at middleware")
        next()
    }
}

export default AuthCheck