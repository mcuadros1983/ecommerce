import { Router } from "express";
import { getAllOrdersByBuyerEmail, getOrderById, createOrder } from "../controllers/ordenControllers.js"
const orderRouter = Router();

// [GET] 🌐/order
orderRouter.get("/", getAllOrdersByBuyerEmail);

// [GET] 🌐/order/:id
orderRouter.get("/:id", getOrderById);

// [POST] 🌐/order
orderRouter.post("/", createOrder);

export default orderRouter;