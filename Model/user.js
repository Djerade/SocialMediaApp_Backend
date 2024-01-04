import mongoose from "mongoose";


var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        createdAt: String
    }, {
        timeesTamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;