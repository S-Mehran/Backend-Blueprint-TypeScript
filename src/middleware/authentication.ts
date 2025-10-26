import Encrypt from "../helpers/encrypt.helper";
import {Request, Response, NextFunction} from "express"

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if (!header) {
        res.status(404).json({message: "Header Not Found"})
    }
    const token = header.split(' ')[1]
    if (!token) {
        res.status(404).json({message: "Token not found"})
    }
    const decode = Encrypt.verifyToken(token)
    if (!decode) {
        return res.status(401).json({message: "Unauthorized"})
    }

    req.headers["user"] = decode;
    next()
}