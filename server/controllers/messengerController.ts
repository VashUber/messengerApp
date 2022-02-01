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

      const { name: firstUserName, email: firstUserEmail } = await User.findOne({
        email: email,
      })

      const { name: secondUserName, email: secondUserEmail } = await User.findOne({
        email: emailToFind,
      })

      const chat = new Chat({
        firstUser: {
          email: firstUserEmail,
          name: firstUserName,
        },
        secondUser: {
          email: secondUserEmail,
          name: secondUserName,
        },
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
        $or: [{ "firstUser.email": email }, { "secondUser.email": email }],
      })

      return res.send({ chats })
    } catch (e) {
      console.log(e)
    }
  },

  async getMesseges(req: Request, res: Response) {},
}

export default messengerController
