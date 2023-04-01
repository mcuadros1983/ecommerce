import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, ref: "categorias", require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    in_cart: { type: Number, default: 0 },
}, { timestamps: true })

export default productSchema
