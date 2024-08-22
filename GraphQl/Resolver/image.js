import { db } from "../../Config/db.js";
import { createReadStream } from 'fs';

export  default {
    uploadImage: async (_, { file }) =>{
        console.log(file);
        const { createReadStream, filename, mimetype } = await file;
    }
}