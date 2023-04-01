
import { Router } from "express";
import { getProductsOfaCart, createCart, createProductOfACart, deleteCartById, deleteProductByCartId } from "../controllers/carritoControllers.js"
import isAuth from "../middleware/isAuth.js";

const cartRouter = Router();


// GET /carrito/:id/productos
cartRouter.get("/:id/productos", isAuth, getProductsOfaCart) 

// POST /carrito
cartRouter.post("/:id/productos", isAuth, createCart)

// POST /carrito/:id/productos/:id_prod
cartRouter.post("/:id/productos", isAuth, createProductOfACart)

// DELETE /carrito/:id
cartRouter.delete("/:id/productos", deleteCartById)

// POST /carrito/:id/products/:id_prod/
cartRouter.post("/:id/productos/:id_prod/", deleteProductByCartId)

export default cartRouter;