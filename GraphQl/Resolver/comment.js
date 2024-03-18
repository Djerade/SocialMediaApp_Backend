import { GraphQLError } from "graphql"
import { Post } from "../../Model/index.js";
import ChechAuth from "../../Auth/Check_Auth.js";


export default {
    createComment:  async (_, {
        postID,
        body,
        username,
        createAt
    },
        context
    ) => {
        const user = ChechAuth(context);
        try {
            console.log(postID);
            const post = await Post.findById(postID);
            return post;
        } catch (error) {
            return Promise.resolve(new GraphQLError(error.message));
        }
    },

    

    
    
    
}