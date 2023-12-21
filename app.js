import express from 'express'

//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

const PORT = process.env.PORT;

// Initialisation
const app = express();

// Test route
app.get('/', (req, res) => {
    res.send('serveur intagram')
});

//Configuration de GraphQl

app.use('./graphql', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphql: true
}))

//Connection base de donnée
db.then(() => {
    app.listen(PORT)
}).catch((err) => {
    console.error(err);
});