import mongoose from "mongoose";
import { Schema } from "mongoose";


var postSchema = new mongoose.Schema(
    {
        body: String,
        username: String,
        createdAt: String,
        comments: [
            {
                body: String,
                username: String
            }
        ],
        likes: [{
            username: String,
            createdAt: String
        }],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }, {
        timeesTamps: true
    }
)
const Post = mongoose.model('Post', postSchema)

export default Post;