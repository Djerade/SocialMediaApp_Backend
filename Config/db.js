import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/Instagram'

export const db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connexion database réussi');  
}).catch((err) => {
    console.error(err);
});