import express from "express"
import dotenv from "dotenv"
import Routes from "./routes"
import mongoose from "mongoose"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"
import User from "./models/User"
import Message from "./models/Message"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

server.listen(process.env.PORT, () => {
  if (process.env.DB)
    mongoose.connect(process.env.DB, {}, () => {
      console.log("Server is working on port " + process.env.PORT)
    })
})

Routes(app)

let usersOnline: Array<{ user: { email: string }; socket: string }> = []

let messages: Array<{ chatId: string; text: string; from: string; to: string }> = []

const addMessageToDB = async (
  chatId: string,
  text: string,
  from: string,
  to: string
) => {
  const message = await new Message({ chatId, text, from, to })
  await message.save()
  return
}

io.on("connect", (socket) => {
  socket.on("addNewUser", (user) => {
    usersOnline.push({ user, socket: socket.id })
  })

  socket.on("sendMessage", (to: string, from: string, text, chatId: string) => {
    const user = usersOnline.find((elem) => elem.user.email === to)
    messages.push({ chatId, text, from, to })

    if (user) {
      io.to(user.socket).emit("getMessage", {
        to,
        from,
        text,
      })
    }
  })

  socket.on("disconnect", () => {
    usersOnline = usersOnline.filter((user) => user.socket !== socket.id)
    const chatsIdUnique = new Set()

    messages.forEach(async (message) => {
      if (
        usersOnline.filter(
          (user) =>
            user.user.email === message.from || user.user.email === message.to
        ).length < 2
      ) {
        chatsIdUnique.add(message.chatId)
        await addMessageToDB(message.chatId, message.text, message.from, message.to)
      }
    })

    const chatsId = [...chatsIdUnique]

    chatsId.forEach((elem) => {
      messages = messages.filter((elem) => elem.chatId !== elem.chatId)
    })

    console.log(messages)
  })
})
