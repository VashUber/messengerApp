import { Express } from "express"
import authController from "../controllers/authController"
import userController from "../controllers/userController"
import messengerController from "../controllers/messengerController"
import auth from "../middleware/auth"

const Routes = (app: Express) => {
  app.post("/auth/signup", authController.signup)
  app.post("/auth/signin", authController.singin)
  app.get("/api/getuser", auth, userController.getUser)
}

export default Routes
