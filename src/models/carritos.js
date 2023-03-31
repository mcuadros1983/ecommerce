import mongoose from 'mongoose';
import productSchema from "./productos.js";

const carritoSchema = new mongoose.Schema({
    // products: { type: [productSchema], require: true },
    email: { type: String, require: true },
    products: { type: [productSchema], require: true },
    delivery_address: { type: String, require: true },
    total: { type: Number, default: 0 }
}, { timestamps: true })

export { carritoSchema };