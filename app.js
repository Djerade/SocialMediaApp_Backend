import express from 'express'
import  {ApolloServer}  from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions';
//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

const PORT = 5000

async function startApolloServer(schema, resolver,) {
    const pubsub = new PubSub();
    
    const server = new ApolloServer({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: async ({ req }) => {
            return { req, pubsub }
        }  
    
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
 