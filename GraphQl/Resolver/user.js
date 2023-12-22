import { GraphQLError } from "graphql";
import { User } from "../../Model/index.js"

 export default {
    users: async () => {
        try {
            const user = await User.find();
            return user
        } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
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