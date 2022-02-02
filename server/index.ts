import express from "express"
import dotenv from "dotenv"
import Routes from "./routes"
import mongoose from "mongoose"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"
import User from "./models/User"

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

const getuser = async (to: string) => {
  return await User.find({ email: to })
}

io.on("connect", (socket) => {
  socket.on("addNewUser", (user) => {
    usersOnline.push({ user, socket: socket.id })
  })

  socket.on("sendMessage", (to: string, from: string, text) => {
    const user = usersOnline.find((elem) => elem.user.email === to)

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
  })
})
