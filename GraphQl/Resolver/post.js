import { GraphQLError } from "graphql";
import { Post } from "../../Model/index.js"

export default {
    getPosts : async () => {
        try {
          const postes = await Post.find();
          return postes.map((post) => {
              return { ...post._doc}
            })
      } catch (error) {
        return Promise.reject(new GraphQLError(error.message))
      }
  },
  
  createPost: async ({
    body,
    username,
  }) => {
    try {
      const newPost = new Post({
      body,
      username,
      createdAt: new Date().toISOString()
      });
      const postSaved = await newPost.save();
      return {
        id: postSaved._id,
        ...postSaved._doc
      }
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message))
    }
  }, 
  updatePoste: async () => {
    try {
      return
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message))
    }
  }
  
}