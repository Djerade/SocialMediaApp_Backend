import { resolve } from "path";
import { db } from "../../Config/db.js";
import { createReadStream, write } from 'fs';
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

const storeFile = async (upload) => {
    const { filename, createReadStream, mimetype } = await upload.then(result => result);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
    
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype
    });
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
            resolve(uploadStream.id)
        })
    })
  }

export  default {
    Upload: GraphQLUpload,
    uploadImage: async (_, { file }) =>{
        const fileId = await storeFile(file).then(result => result);
        console.log(fileId);
        return true;
    
    }
}