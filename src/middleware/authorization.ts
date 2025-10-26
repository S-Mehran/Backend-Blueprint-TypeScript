import {Request, Response, NextFunction} from "express"
import { userRepository } from "../repository"
import { User } from "../entity/User"

export const authorization = (acessRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction)=>{
    const user = req.headers["user"] as User
    const userData = await userRepository.findById(user.id)

    if (userData && !acessRoles.includes(userData.role)) {
        res.status(403).json({message: "Forbidden"})
    }
    next();
    }
}