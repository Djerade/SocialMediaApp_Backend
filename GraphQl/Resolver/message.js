import { Message, User } from "../../Model/index.js";
import ChechAuth from "../../Auth/Check_Auth.js";

export default {
    getMessages: async (_, context) => {
        const user = ChechAuth(context);
        if (user) {
            try {
                const  messages = await User.messages.find()
            } catch (error) {
                return Promise.reject(new GraphQLError(error.message));
            }
        } else {
            console.error("Authentification requised");
        }
    },

    createMessage: async ({ idreceiver, content}, context) => {

        const sender = ChechAuth(context);
        const receiver = await User.findById(idreceiver);
        
        if (sender) {
            try {
                const message = new Message({
                    content,
                    sender,
                    receiver,
                    createdAt: new Date().toISOString()
                })
                const messageSaved = await message.save();
                return {
                    id: messageSaved._id,
                    ...messageSaved._doc
                }
            } catch (error) {
                return Promise.reject(new GraphQLError(error.message))
            }
        } else {
            console.error("Authentification requised");
        }
    }
}