import  User  from "./user.js";
import Post from "./post.js"
import comment from "./comment.js";
export const resolver = {
    ...User,
    ...Post,
    ...comment
}