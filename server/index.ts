import express from "express"
import dotenv from "dotenv"
import Routes from "./routes"
import mongoose from "mongoose"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

server.listen(process.env.PORT, () => {
  if (process.env.DB)
    mongoose.connect(process.env.DB, {}, () => {
      console.log("Server is working on port " + process.env.PORT)
    })
})

Routes(app)

io.on("connection", (socket) => {
  console.log("a user connected")
})
