import mongoose from "mongoose";


var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        followers: [
            {
                id: String,
                followeAt: String
            }
        ],
        following: [
            {
                id: String,
                followeAt: String
            }
        ],
        createdAt: String,
    }, {
        timeesTamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;