import mongoose from "mongoose";



var imageSchema = new mongoose.Schema(
    {
        filename: String,
        contentType: String,
        url: String,
        createdAt: String,

    }, {
    timeesTamps: true
}
);
const Image = mongoose.model('Image', imageSchema)

export default Image;