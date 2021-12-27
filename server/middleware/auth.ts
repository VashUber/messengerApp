import { Request, Response, NextFunction } from "express"
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"
import User from "../models/User"

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json("Пользователь не авторизован")
    }

    if (process.env.TOKEN_KEY) {
      const data = jsonwebtoken.verify(token, process.env.TOKEN_KEY)

      if (typeof data !== "string") {
        const user = await User.findOne({ _id: data.id })
        if (user) next()
      }
    }
  } catch (e) {
    console.log(e)
    return res.status(401).json({ msg: "Пользователь не авторизован" })
  }
}

export default auth
