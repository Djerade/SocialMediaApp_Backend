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
            type: Schema.Types.Map,
            ref: 'User',
            required: true
        }
    }, {
    timeesTamps: true
}
);
const Post = mongoose.model('Post', postSchema)

export default Post;