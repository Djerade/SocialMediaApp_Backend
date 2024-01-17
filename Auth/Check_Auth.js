import jwt from "jsonwebtoken"
const SECRET_KEY = "perfef"

const ChechAuth = (context) => {
    //context  = {...header}
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.spl
    }
}

export default ChechAuth;