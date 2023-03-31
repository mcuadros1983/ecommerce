import { Router } from "express"; 
import {getProducts, addProduct, updateProduct, deleteProduct} from "../controllers/productosControllers.js"
const productRouter = Router();

// GET /productos/:id?
productRouter.get("/id?", getProducts)

// GET /productos/:id
// productRouter.get("/:id", getProductsById)

// POST /productos/
productRouter.post("/", addProduct)

// PUT /productos/:id
productRouter.put("/:id", updateProduct)

// DELETE /productos/:id
productRouter.delete("/:id", deleteProduct)

export default productRouter;