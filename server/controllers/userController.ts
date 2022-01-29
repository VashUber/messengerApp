import { Request, Response } from "express"
import User from "../models/User"

const userController = {
  async getUser(req: Request, resp: Response) {
    
    const user = await User.findOne({ email: req.query.email })
    const { name, email } = user

    return resp.send({ name, email })
  },
}

export default userController
