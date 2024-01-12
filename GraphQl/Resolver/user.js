import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { GraphQLError } from "graphql";
import { User } from "../../Model/index.js"


const SECRET_KEY = "perfef"
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
    createAccount: async ({
        username,
        password,
        confirmationPassword,
        email
    }
    ) => {
        try {
            password = await bcrypt.hash(password, 12);

            const user = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            const userSaved = await user.save();
            const token = jwt.sign({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email
            }, SECRET_KEY, { expiresIn: '1h' });
            console.log(token);
            return {
                id: userSaved._id,
                ...userSaved._doc,
                token
            }
         } catch (error) {
            return Promise.reject(new GraphQLError(error.message))
         }
     }
}



