import { GraphQLError } from "graphql"
import { Post } from "../../Model/index.js";
import ChechAuth from "../../Auth/Check_Auth.js";


export default {

    createComment: async (_, {
        postID,
        body,
        username,
        createAt
    },
        context
    ) => {
        const user = ChechAuth(context);
        try {
            if (body.trim() === '') {
                throw new Error('comment must not be empty')
            }
            const post = Post.findById(postID);
            console.log(post);
            return post;
        } catch (error) {
            return Promise.resolve(new GraphQLError(error.message));
        }
    }
    
    
}