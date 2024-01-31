import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken"
const SECRET_KEY = "perfect"

const ChechAuth = (context) => {
    const authHeader = context?.req?.headers.authorization;
    console.log(context?.req?.headers);
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