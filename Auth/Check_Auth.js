import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken"
const SECRET_KEY = "perfef"

const ChechAuth = (context) => {
    //context  = {...header}
    //req?.headers?.authorization?.split('Bearer ')[1]
    console.log("context", context.customerHeader);
    const authHeader = context?.req?.headers.authorization;
    if (authHeader) {
        const token = authHeader.splite('Bearer')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (error)
            {
                throw new AuthenticationError('token invalide');
            }
        }
        throw new Error('token ')
    }
}

export default ChechAuth;