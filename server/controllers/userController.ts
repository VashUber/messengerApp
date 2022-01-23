import { Request, Response } from "express"
import User from "../models/User"
import { Document } from "mongoose"

const userController = {
  async getUser(req: Request, resp: Response) {
    const user = await User.findOne({ email: req.body.email })
    const { name, email } = user

    return resp.send({ name, email })
  },
}

export default userController
