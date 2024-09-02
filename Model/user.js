import mongoose from "mongoose";


var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        sentMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        receivedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        createdAt: String

    }, {
        timeesTamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;