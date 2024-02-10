import express from 'express'
import  {ApolloServer, AuthenticationError}  from 'apollo-server-express'
//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";
import jwt from "jsonwebtoken"


const PORT = 5000
const SECRET_KEY = "perfect"

const creatContext = (request) => {
    if (!request.req.headers.authorization) {
        console.log('inconnu');
    } else {
        const authHeader = request.req.headers.authorization;
        const token = authHeader.split(' ')[1];
        try {
            const user = jwt.verify(token, SECRET_KEY);
            console.log("user",user);
            return user;
        } catch (error) {
            console.error('Erreur',error);
        }
    }
}
async function startApolloServer(schema, resolver,) {
    const server = new ApolloServer({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: creatContext
    }); 
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    db.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
    })
    }).catch((err) => {
        console.error(err);
    });
}

startApolloServer(schema, resolver);
 