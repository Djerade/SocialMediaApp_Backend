import { User } from "./user.js";
import { Post } from "./post.js"
import { Comment } from "./comment.js";
import { Like } from "./like.js";
import { Message } from "./message.js";


const Mutations = [User, Message, Post, Comment, Like]
export { Mutations }