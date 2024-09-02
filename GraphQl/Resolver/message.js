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
        const  sender  = ChechAuth(context);
        let id = sender.id;
        const receiver = await User.findById(idreceiver);
        if (sender)     {
            try {
                const message = new Message({
                    content,
                    sender: id,
                    receiver: idreceiver,
                    
                })
                const messageSaved = await message.save();

                // update sender
                await User.findByIdAndUpdate(id, { $push: { sentMessages: messageSaved._id }});

                // update receiver
                await User.updateMany(
                    { _id: { $in: idreceiver}}, 
                    { $push: {receivedMessages: messageSaved._id }}
                );

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