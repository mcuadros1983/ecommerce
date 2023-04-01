import { carritosDao, productosDao } from "../daos/index.js";
import { logger } from "../utils/index.js";

// GET /carrito/:id/productos
const getProductsOfaCart = async (req, res) => {
    try {
        let { id } = req.params;
        carritosDao.getById(id).then(item => {
            if (item.status === 'Error') {
                res.status(500);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 500,
                    message: item.message,
                });
            } else {
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.status(200).render("./pages/cart.ejs", {
                    products: item.payload.products,
                    cartId: req.cookies.cartIdCookie,
                    cartTotal: item.total,
                    categories: req.cookies.categoriesCookie,
                    userId: req.cookies.userIdCookie
                });
            }
        })
    } catch (err) {
        res.status(500);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: item.message,
        });
    }

}

// POST /carrito
const createCart = async (req, res) => {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 422,
            message: "No se pudo obtener los atributos del carrito correctamente",
        });
    } else {
        carritosDao.save(body).then(item => {
            if (item.status === 'Error') {
                res.status(500);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 500,
                    message: item.message,
                });
            } else {
                res.status(201)
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.json({ newCartId: item._id });
            }
        })
    }
}

const createProductOfACart = async (req, res) => {
    try {
        const {
            params: { id, id_prod },
        } = req;
        const product = await productosDao.getById(id_prod);
        const cart = await carritosDao.getById(id);
        if (!product.payload) {
            res.status(404);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 404,
                message: "Producto no encontrado",
            });
            if (!cart.payload) {
                res.status(404);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 404,
                    message: "Carrito no encontrado",
                });
            }
        }
        await carritosDao.createProductOfACart(id, product);
        res.status(302);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.redirect(`/carrito/${id}/productos`);
    } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: "Internal Server Error",
        });
    }
}

// DELETE /carrito/:id
const deleteCartById = async (req, res) => {
    let { id } = req.params;
    carritosDao.deleteCartById(id).then(item => {
        if (item.status === 'Error') {
            res.status(500);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 500,
                message: item.message,
            });
        } else {
            res.status(200);
            logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.redirect(`/carrito/${id}/productos`);
        }
    })
}

// DELETE /carrito/:id/productos/:id_prod
const deleteProductByCartId = async (req, res) => {
    try {
        const { params: { id, id_prod } } = req;
        const product = await productosDao.getById(id_prod);
        const cart = await carritosDao.getById(id);
        if (!product.payload) {
            res.status(404);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 404,
                message: "Product Not Found",
            });
            if (!cart.payload) {
                res.status(404);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 404,
                    message: "Cart Not Found",
                });
            }
        }
        await carritosDao.deleteProductByCartId(id, id_prod);
        res.status(302);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.redirect(`/carrito/${id}/productos`);
    } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: err?.message,
        });
    }
}

export { getProductsOfaCart, createCart, createProductOfACart, deleteCartById, deleteProductByCartId }