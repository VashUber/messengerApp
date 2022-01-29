import { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"
import User from "../models/User"

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    const email = req.body.email || req.query.email

    if (!token) {
      return res.status(401).json("Пользователь не авторизован")
    }

    if (process.env.TOKEN_KEY) {
      const data = jsonwebtoken.verify(token.split(" ")[1], process.env.TOKEN_KEY, async (error, user) => {
        if (error) return res.status(403).json("Токен не валидный")

        const potentialUser = await User.findOne({ email })
        if (typeof user !== "string" && user && potentialUser.email === user.email) next()
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(401).json({ msg: "Пользователь не авторизован" })
  }
}

export default auth
