import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const Messagechema = new mongoose.Schema({
  chatId: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
})

Messagechema.plugin(mongoosePaginate)
const Message = mongoose.model("Messege", Messagechema)

export default Message
