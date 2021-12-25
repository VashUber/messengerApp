import express from "express"
import dotenv from "dotenv"
import Routes from "./routes"

dotenv.config()
const app = express()

app.listen(process.env.PORT, () => {
  console.log("Server is working on port = " + process.env.PORT)
})

Routes(app)
