import { GraphQLError } from "graphql"
import { Post } from "../../Model/index.js";
import ChechAuth from "../../Auth/Check_Auth.js";


export default {
    createComment:  async ( {
        postID,
        body,  
    },
    context
    ) => {    
        const { username } = ChechAuth(context);
        if (username) {
            try {
                const post = await Post.findById(postID);
                if (post) {
                    post.comments.unshift({
                        body,
                        username,
                        createAt: new Date().toISOString()
                    });
                    const postSaved = await  post.save();
                    return {
                        id: postSaved._id,
                        ...postSaved._doc
                    }
                }

            } catch (error) {
                return Promise.resolve(new GraphQLError(error.message));
            }
        } else {
            throw new Error("Authentication failed");
        }
    },

    

    
    
    
}