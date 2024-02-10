import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken"
const SECRET_KEY = "perfect"

const ChechAuth = (context) => {
    console.log(context);
        // const token = context.split(' ')[1];
        // try {
        //     const user = jwt.verify(token, SECRET_KEY);
        //     // console.log("user",user);
        //     return user;
        // } catch (error) {
        //     console.error('Erreur',error);
    // }
      if (!context.req.headers.authorization) {
        return
    } else {
        const token = context.req.headers.authorization;
        console.log("token", token);
        return token;
        // const authHeader = request.req.headers.authorization;
    }
}

export default ChechAuth;