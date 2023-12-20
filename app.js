import express from 'express'

//Import
import { db } from "./Config/db.js";

const PORT = process.env.PORT;

// Initialisation
const app = express();

// Test route
app.get('/', (req, res) => {
    res.send('serveur intagram')
});

app.listen(PORT, () => {
    console.log('serveur runnig');
})

//Connection base de donnée
db.then(() => {
    app.listen('5000', () => {
    console.log('serveur runnig');
})
}).catch((err) => {
    console.error(err);
});


