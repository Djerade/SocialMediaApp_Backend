import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import  {ApolloServer, gql}  from 'apollo-server-express'
//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

// const PORT = process.env.PORT;
const PORT = 5000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
// Initialisation
// const app = express();

// const server = new ApolloServer({
//     typeDefs, resolvers
// });

// await ApolloServer.start();

// server.applyMiddleware({ app });

async function startApolloServer(schema, resolver){
    const server = new ApolloServer({schema, resolver})
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
})
}

startApolloServer(schema, resolver); 
 
// Test route
// app.get('/', (req, res) => {
//     res.send('serveur intagram')
// });



//Configuration graphql
// app.use('/graphql', createHandler({
//     schema,
//     rootValue: resolver,
//     graphql: true
// }));

//Connection base de donnée
// db.then(() => {
//     app.listen(PORT, () => {
//         console.log('serveur ruinning',PORT);
//     })
// }).catch((err) => {
//     console.error(err);
// });