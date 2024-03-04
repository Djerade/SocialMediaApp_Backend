import mongoose from "mongoose";
import { Schema } from "mongoose";


var postSchema = new mongoose.Schema(
    {
        body: String,
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
            id: String,
            username: String,
            email: String
        }
    }, {
    timeesTamps: true
}
);
const Post = mongoose.model('Post', postSchema)

export default Post;