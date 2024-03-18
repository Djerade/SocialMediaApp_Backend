import { GraphQLError } from "graphql";
import { Post } from "../../Model/index.js"
import ChechAuth from "../../Auth/Check_Auth.js";

export default {
  getPosts: async (context) => {
    const user = ChechAuth(context);
    if (user) {
        try {
          const postes = await Post.find();
          return postes.map((post) => {
            return {
              id: post._id,
              ...post._doc
            }
          })
        } catch (error) {
          return Promise.reject(new GraphQLError(error.message))
        }
    } else {
      
    }
  },

  getPost: async (_, { _id }) => {
    const user = ChechAuth(context);
    console.log(user);
    try {
      const post = await Post.findById( _id );
      if (!post) {
        throw new Error("post don't exist");
      }
      return {
        id: post._id,
        ...post._doc
      }
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message))
    }
  },
  
  createPost: async ({
    body,
  }, context) => {
    const user = ChechAuth(context);
    if (user) {
      try {
        const newPost = new Post({
        body,
        user,
        createdAt: new Date().toISOString()
        });
        const postSaved = await newPost.save();
        return {
          id: postSaved._id,
          ...postSaved._doc,
          ...postSaved.__v
        }
      } catch (error) {
        return Promise.reject(new GraphQLError(error.message))
      }
    } else {
      console.log("Authentification requise");
    }
  }, 
  updatePost: async ({_id, body}) => {
    try {
      const post = await Post.findByIdAndUpdate({
        _id: `${_id}`
      }, {
        $set: {
          body
        }
      }, {
        new: true
      });
      return {
        id: _id,
        ...post._doc
      }
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message))
    }
  },
  deletPost: async ({ _id }, context) => {
    const user = ChechAuth(context);
    try {
      const post = await Post.findByIdAndDelete({ _id: `${_id}` }, { new: true});
      if (!post) {
        throw new Error("post don't exist");
      }
      return {
        id: post._id,
        ...post._doc
      }
    } catch (error) {
      return Promise.reject(new GraphQLError(error.message));
    }
  }
  
}