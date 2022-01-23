import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import { Document } from "mongoose"
import User from "../models/User"

const authController = {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (await User.findOne({ email })) {
        return res.status(400).json({ msg: "Пользователь с такой почтой уже существует" })
      }

      const passwordHash = bcrypt.hashSync(password, 6)
      const user: Document = new User({ name, email, password: passwordHash })
      await user.save()

      return res.send("Пользователь успешно создан")
    } catch (e) {
      console.log(e)
    }
  },
  async singin(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ msg: "Такого пользователя не существует" })
      }

      const passwordCheck = bcrypt.compareSync(password, user.password)
      if (!passwordCheck) {
        return res.status(400).json({ msg: "Неверный пароль" })
      }
      if (process.env.TOKEN_KEY) {
        const token = jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_KEY)
        return res.send({ token, email: user.email })
      }

      return res.json({ msg: "Непредвиденная ошибка" })
    } catch (e) {
      console.log(e)
    }
  },
}

export default authController
