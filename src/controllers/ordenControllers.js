import { ordenDao, carritosDao, usuariosDao } from "../daos/index.js";
import { logger, sendMailTo } from "../utils/index.js";

const getAllOrdersByBuyerEmail = async (req, res) => {
    try {
        const { email } = req.user;
        const ordenes = await ordenDao.getAllOrdersByBuyerEmail(email)
        if (ordenes) {
            res.status(200);
            logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/order.ejs", {
                orders: ordenes,
                cartId: req.cookies.cartIdCookie,
                categories: req.cookies.categoriesCookie,
                userId: req.cookies.userIdCookie,
            });
        } else {
            res.status(404);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 404,
                message: "Orden no encontrada",
            });
        }
    } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const getOrderById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const { payload } = await usuariosDao.getById(req.user._id);
        const { cart_id } = payload
        ordenDao.getById(id).then(item => {
            if (item) {
                res.status(200);
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/single-order.ejs", {
                    order: item.payload,
                    cartId: req.cookies.cartIdCookie,
                    categories: req.cookies.categoriesCookie,
                    userId: req.cookies.userIdCookie,
                });
            }
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.status(404).render("./pages/error.ejs", {
                code: 404,
                message: "Order Not Found",
            });

        })
    } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const createOrder = async (req, res) => {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 3) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 422,
            message: "No se pudo obtener los atributos del carrito correctamente",
        });
    } else {
        try {
            const { state } = body;
            const { payload } = await usuariosDao.getById(req.user._id);

            const { email, products } = payload;
            let total = 0;
            products.forEach((product) => {
                total = total + product.price;
            });
            const order = {
                products,
                state,
                purchase_date: generatePurchaseDate(new Date(Date.now())),
                buyer_email: email,
                total,
            };
            await carritosDao.deleteById(payload.cart_id);
            const newOrder = await ordenDao.save(order);

            sendMailTo(
                newOrder.payload.buyer_email,
                "Compraste en Mi Tienda",
                `Tu compra se ha realizado correctamente. Tu número de orden es ${newOrder.payload._id}`
            );
            res.status(200);
            logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/single-order.ejs", {
                purchase_date: newOrder.payload.purchase_date,
                cartId: req.cookies.cartIdCookie,
                categories: req.cookies.categoriesCookie,
                userId: req.cookies.userIdCookie,
            });
        } catch (err) {
            res.status(500);
            logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 500,
                message: "Internal Server Error",
            });
        }
    }
}

export { getAllOrdersByBuyerEmail, getOrderById, createOrder }