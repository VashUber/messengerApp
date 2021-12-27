import { Express } from "express"
import authController from "../controllers/authController"
import auth from "../middleware/auth"

const Routes = (app: Express) => {
  app.post("/auth/signup", authController.signup)
  app.post("/auth/signin", authController.singin)
  app.get("/", auth, (req, res) => {
    res.send("да да я")
  })
}

export default Routes
