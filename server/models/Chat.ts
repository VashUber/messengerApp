import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
  firstUser: {
    type: String,
    require: true,
  },
  secondUser: {
    type: String,
    require: true,
  },
  chatId: {
    type: String,
    require: true,
    unique: true,
  },
})

const Chat = mongoose.model("Chat", ChatSchema)

export default Chat
