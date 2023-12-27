import { GraphQLError } from "graphql";
import { User } from "../../Model/index.js"

 export default {
    users: async () => {
        try {
            const users = await User.find();
            users.map((user) => {
                  return {
                ...user._doc
            }
            })
        } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
        }
    },
    user: async () => {
         try {
            return 
         } catch (error) {
            return Promise.reject(new GraphQLError(error.message) )
         }
     },
    createAccounte: async ({
        firstName
    }
    ) => {
        try {
            const user = new User({ firstName });
            console.log('reslutat',user);
            const userSaved = await user.save();
            return {
                ...userSaved._doc
            }
         } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
         }
     }
}