import mongoose, { Mongoose } from "mongoose";


var userSchema = new mongoose(
    {
        firtName: {
            type: String
        }
    }, {
        timeesTamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;