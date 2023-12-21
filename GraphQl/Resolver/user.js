import { GraphQLError } from "graphql";
import { User } from "../../Model/index.js"

 export default {
    user: async () => {
        try {
            const user = await User.find();
            return user
        } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
        }
    }
}