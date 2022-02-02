import mongoose from "mongoose"

const Messagechema = new mongoose.Schema({
  chatId: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
})

const Message = mongoose.model("Messege", Messagechema)

export default Message
