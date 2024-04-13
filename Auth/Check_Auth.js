import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
const SECRET_KEY = "perfect";

const ChechAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!context.req.headers.authorization) {
    console.log("authorization requised");
  } else {
    try {
      const user = jwt.verify(token, SECRET_KEY);
      return user;
    } catch (error) {
      console.error("Erreur", error);
    }
  }
};

export default ChechAuth;
