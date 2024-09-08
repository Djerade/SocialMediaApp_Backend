import  User  from "./user.js";
import Post from "./post.js"
import comment from "./comment.js";
import like from "./like.js";
import message from "./message.js";

export const resolver = {
    ...User,
    ...Post,
    ...comment,
    ...like,
    ...message,
}