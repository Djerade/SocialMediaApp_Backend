import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { GraphQLError } from "graphql";

//Import
import { User } from "../../Model/index.js"
import { UserInputError } from "apollo-server-express";
import { Validation } from "../../Auth/validation.js";


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
            Validation(username, password, confirmationPassword, email);
            password = await bcrypt.hash(password, 12);
            const user = User.findOne({ username });
            if (user) {
                throw  new UserInputError('user exist')
            }
            const newuser = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });
            const userSaved = await newuser.save();
            const token = jwt.sign({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email
            }, SECRET_KEY, { expiresIn: '1h' });
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



