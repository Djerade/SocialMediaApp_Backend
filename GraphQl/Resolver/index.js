import  User  from "./user.js";
import  Post  from "./post.js"
export const resolver = {
    ...User,
    ...Post
}