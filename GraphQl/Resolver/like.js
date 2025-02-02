import { GraphQLError } from "graphql"
import { Post } from "../../Model/index.js";
import CheckAuth from "../../Auth/Check_Auth.js";


export default {
     like: async ({
        postID,
     },
     context
    ) =>{
        const { username } = CheckAuth(context)
        if( username){
         try {
            const post = await Post.findById(postID);
            if(post) {
               post.likes.unshift({
                  username
               });
               const postSaved =  await post.save();
               return {
                  id: postSaved._id,
                  ...postSaved._doc
               }
            }
         } catch(error) {
            return Promise.resolve(new GraphQLError(error.message));
         }
        } else {
            throw new Error('Authentication  failled')
        }
     }
}