import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import { productosDao, usuariosDao } from "../daos/index.js";
import cartRouter from "./carrito.js";
import productRouter from "./productos.js";
import userRouter from "./usuario.js";
import orderRouter from "./orden.js";
import logger from "../utils/logger.js";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const products = await productosDao.getAll();
  const user = await usuariosDao.getById(req.user._id);
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.status(200).render("index.ejs", { 
    sectionTitle: "Productos",
    products: products.payload, 
    cartId: user.payload.cart_id,
    userId: user.payload.cart_id,
  });
});

router.use("/carrito", cartRouter);
router.use("/productos", productRouter);
router.use("/usuarios", userRouter);
router.use("/orden", orderRouter)

router.use((req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.render("./pages/error.ejs", {
    code: 404,
    message: "Not Found",
  });
});


export default router; 