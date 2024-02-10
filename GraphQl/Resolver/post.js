import { GraphQLError } from "graphql";
import { Post } from "../../Model/index.js"
import ChechAuth from "../../Auth/Check_Auth.js";

export default {
  getPosts: async () => {
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
  },

  getPost: async (_, { _id }) => {
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
  
  createPost: async (_, {
    body,
    username,
  }, context) => {
    console.log(
      body,
      username
    );
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
  deletPost: async ({_id}) => {
    try {
      console.log('id', _id);
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