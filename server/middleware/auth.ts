import { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json("Пользователь не авторизован")
    }

    if (process.env.TOKEN_KEY) {
      const data = jsonwebtoken.verify(token.split(' ')[1], process.env.TOKEN_KEY)
      console.log(token);
      next()
    }
  } catch (e) {
    console.log(e)
    return res.status(401).json({ msg: "Пользователь не авторизован" })
  }
}

export default auth
