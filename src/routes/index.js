import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import { productosDao, usuariosDao, categoriasDao } from "../daos/index.js";
import cartRouter from "./carrito.js";
import productRouter from "./productos.js";
import userRouter from "./usuario.js";
import orderRouter from "./orden.js";
import logger from "../utils/logger.js";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const products = await productosDao.getAll();
  const user = await usuariosDao.getById(req.user._id);
  const categories = await categoriasDao.getAll();
  res.status(200)
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res
    .cookie("cartIdCookie", user.payload.cart_id, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 300000),
    })
    .cookie("userIdCookie", req.user._id, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 300000),
    })
    .cookie("categoriesCookie", categories.payload, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 300000),
    })
    .render("index.ejs", {
      sectionTitle: "Productos",
      products: products.payload,
      cartId: user.payload.cart_id,
      categories: categories.payload,
      userId: req.cookies.userIdCookie,
    });
    console.log("text_req", req.cookies.userIdCookie) 
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