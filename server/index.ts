import express from "express"
import dotenv from "dotenv"
import Routes from "./routes"
import mongoose from "mongoose"

dotenv.config()
const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => {
  if (process.env.DB)
    mongoose.connect(process.env.DB, {}, () => {
      console.log("Server is working on port " + process.env.PORT)
    })
})

Routes(app)
