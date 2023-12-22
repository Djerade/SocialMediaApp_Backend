import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
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

//Configureation graphql
app.all('/graphql', createHandler({
    schema,
    rootValue: resolver,
}));

//Connection base de donnée
db.then(() => {
    app.listen(PORT)
}).catch((err) => {
    console.error(err);
});