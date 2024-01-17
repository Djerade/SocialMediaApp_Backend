import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import  {ApolloServer, gql}  from 'apollo-server-express'
//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

const PORT = 5000

async function startApolloServer(schema, resolver){
    const server = new ApolloServer({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: ({req}) =>({ req })
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
 

