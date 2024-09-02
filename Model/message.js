import mongoose from "mongoose";


var messageSchema = new mongoose.Schema(
    {
        content: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sentAt: { type: Date, default: Date.now },
    }, {
        timeesTamps: true
    }
)

const Message = mongoose.model('Message', messageSchema)

export default Message;