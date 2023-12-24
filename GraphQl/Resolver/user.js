import { GraphQLError } from "graphql";
import { User } from "../../Model/index.js"

 export default {
    users: async () => {
        try {
            const users = await User.find();
            console.log(user);
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
    createCompte: async (
        {
        firstName
    }
    ) => {
         try {
            return
         } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
         }
     }
}