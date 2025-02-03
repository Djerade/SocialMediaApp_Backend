import { GraphQLError } from "graphql";
import { Post } from "../../Model/index.js";
import CheckAuth from "../../Auth/Check_Auth.js";

export default {
  like: async ({ postID }, context) => {
    const { username } = CheckAuth(context);
    if (username) {
      try {
        const post = await Post.findById(postID);
        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            // Post already like
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
            const postSaved = await post.save();
            return {
              id: postSaved._id,
              ...postSaved._doc
            };
          } else {
            // No like
            post.likes.push({
              username,
              createdAt: new Date().toISOString()
            });
            const postSaved = await post.save();
            return {
              id: postSaved._id,
              ...postSaved._doc
            };
          }
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        return Promise.resolve(new GraphQLError(error.message));
      }
    } else {
      throw new Error("Authentication  failled");
    }
  }
};
