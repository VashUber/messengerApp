import { Express } from "express"
import authController from "../controllers/authController"
import userController from "../controllers/userController"
import messengerController from "../controllers/messengerController"
import auth from "../middleware/auth"

const Routes = (app: Express) => {
  app.post("/auth/signup", authController.signup)
  app.post("/auth/signin", authController.singin)
  app.get("/api/getuser", auth, userController.getUser)
  app.post("/api/createchat", auth, messengerController.createChat)
  app.get("/api/getchats", auth, messengerController.getChats)
  app.get("/api/getmessages", auth, messengerController.getMessages)
}

export default Routes
