import mongoose from 'mongoose';
import productSchema from "./productos.js";

const PurchaseDateSchema = new mongoose.Schema({
  number: { type: String, require: true },
  day: { type: String, require: true },
  month: { type: String, require: true },
  year: { type: String, require: true },
});

const orderSchema = new mongoose.Schema(
  {
    products: { type: [productSchema], require: true },
    state: { type: String, require: true, default: "Generada" },
    buyer_email: { type: String, require: true },
    purchase_date: { type: PurchaseDateSchema, require: true },
    total: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

export default orderSchema