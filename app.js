import express from 'express'
import  { ApolloServer }  from 'apollo-server-express'
import mongoose from 'mongoose';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import gridfsStream from 'gridfs-stream';
import * as  dotenv from 'dotenv';

//Import
import { db } from "./Config/db.js";
import { resolver } from "./GraphQl/Resolver/index.js";
import { schema } from "./GraphQl/Schema/index.js";

dotenv.config()
async function startApolloServer(schema, resolver,) {
    const conn = mongoose.connection;
    let gfs;
    conn.once('open', () => {
      gfs = gridfsStream(conn.db, mongoose.mongo);
      gfs.collection('uploads'); // Nom de la collection GridFS
    });
    // Configurer le serveur Apollo
    const server = new ApolloServer({
        schema,
        rootValue: resolver,
        graphiql: true,
        context: ({ req }) => ({ req })
    }); 
    const app = express();
    // Middleware pour gérer les téléchargements de fichiers            
    app.use(graphqlUploadExpress ());
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    // Endpoint pour récupérer les fichiers
    app.get('/files/:filename',(req, res) =>{
        gfs.files.findOne({ filename: req.params.filename }, (err, file) =>{
            if(!file || file.length === 0){
                return res.status(404).json({ err: 'Fichier non trouvé' });
            }
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        })
    })
    db.then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is listening on port ${process.env.PORT}${server.graphqlPath}`);
    })
    }).catch((err) => {
        console.error(err);
    });
}

startApolloServer(schema, resolver);
 