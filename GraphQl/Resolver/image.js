import { resolve } from "path";
import { db } from "../../Config/db.js";
import { createReadStream } from 'fs';
import { rejects } from "assert";
import { GraphQLUpload } from 'graphql-upload-ts';
import mongoose from 'mongoose';
import gridfsStream from 'gridfs-stream';
import Image from "../../Model/image.js";

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});



export  default {
    Upload: GraphQLUpload,
    uploadImage: async (_, { file }) =>{
   
        
        const { createReadStream, filename, mimetype } = await file;
        console.log("filename",createReadStream);
        
        return new Promise((resolve, rejects) =>{
            const writeStream = gfs.createWriteStream({
                filename,
                contentType: mimetype,
            });
        });
    }
}