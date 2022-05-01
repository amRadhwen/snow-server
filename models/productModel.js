const { Schema, model } = require("mongoose");


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    video: {
        type: String,
    }
    ,
    countInStock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports.Product = model("Product", productSchema);