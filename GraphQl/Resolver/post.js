import { GraphQLError } from "graphql";
import { Post } from "../../Model/index.js"

export default {
    posts : async () => {
        try {
            const postes = await Post.find();
            return postes;
        return
      } catch (error) {
        return Promise.reject(new GraphQLError(error.message))
      }
    }
    
}