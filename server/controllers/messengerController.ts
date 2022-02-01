import { Request, Response } from "express"
import User from "../models/User"
import Chat from "../models/Chat"
import uniqid from "uniqid"

const messengerController = {
  async createChat(req: Request, res: Response) {
    try {
      const { emailToFind, email } = req.body

      if (!(await User.findOne({ email: emailToFind }))) {
        return res.status(400).json({ msg: "Такого пользователя не существует" })
      }

      if (emailToFind === email) {
        return res.status(400).json({ msg: "Нельзя создать час с собой" })
      }

      const chat = new Chat({
        firstUser: email,
        secondUser: emailToFind,
        chatId: uniqid("samara"),
      })

      chat.save()
    } catch (e) {
      console.log(e)
    }
  },

  async getChats(req: Request, res: Response) {
    try {
      const { email } = req.query
      const chats = await Chat.find({
        $or: [{ firstUser: email }, { secondUser: email }],
      })

      console.log(chats)

      return res.send({ chats })
    } catch (e) {
      console.log(e)
    }
  },

  async getMesseges(req: Request, res: Response) {},
}

export default messengerController
