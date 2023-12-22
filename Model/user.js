import mongoose from "mongoose";


var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String
        }
    }, {
        timeesTamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;