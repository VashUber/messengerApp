import { Express } from "express"

const Routes = (app: Express) => {
  app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
  })
}

export default Routes
