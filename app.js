import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

const PORT = process.env.PORT || 5000;

async function startApolloServer(schema, resolver) {
  const server = new ApolloServer({
    schema,
    rootValue: resolver,
    graphiql: true,
    context: ({ req }) => ({ req })
  });
  const app = express();
  app.use(cors());
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  db.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
    });
  }).catch((err) => {
    console.error(err);
  });
}

startApolloServer(schema, resolver);
