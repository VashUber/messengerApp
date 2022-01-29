import mongoose from "mongoose"

const Messegechema = new mongoose.Schema({
  chatId: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
})

const Messege = mongoose.model("Messege", Messegechema)

export default Messege
