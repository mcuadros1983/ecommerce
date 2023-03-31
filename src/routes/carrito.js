
import { Router } from "express";
import { getProductsOfaCart, createCart, createProductOfACart, deleteCartById, deleteProductByCartId } from "../controllers/carritoControllers.js"
const cartRouter = Router();


// GET /carrito/:id/productos
cartRouter.get("/:id/productos", getProductsOfaCart) 

// GET /carrito/
// cartRouter.get("/:id/productos",getCarts)

// POST /carrito
cartRouter.post("/:id/productos", createCart)

// POST /carrito/:id/productos/:id_prod
cartRouter.post("/:id/productos", createProductOfACart)

// DELETE /carrito/:id
cartRouter.delete("/:id/productos", deleteCartById)

// DELETE /carrito/:id/productos/:id_prod
cartRouter.delete("/:id/productos", deleteProductByCartId)

export default cartRouter;