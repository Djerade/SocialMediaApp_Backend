import mongoose from "mongoose";


var messageSchema = new mongoose.Schema(
    {
        content: String,
        sender: {
             type: mongoose.Schema.Types.ObjectId, ref: 'User'
             },
        receiver: {
            id: String,
            username: String,
            email: String
        },
        createdAt: String
    }, {
        timeesTamps: true
    }
)

const Message = mongoose.model('Message', messageSchema)

export default Message;