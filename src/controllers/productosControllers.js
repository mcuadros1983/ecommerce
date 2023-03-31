import { productosDao, carritosDao } from "../daos/index.js";
import { logger } from "../utils/index.js";

// GET /productos/:id
const getProducts = async (req, res) => {
    const { id } = req.params;
    const { payload } = await usuariosDao.getById(req.user._id);
    const { cart_id } = payload
    if (id) {
        productosDao.getById(id).then(item => {
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
                res.render("./pages/single-product.ejs", {
                    product: item.payload,
                    cartId: cart_id,
                    userId: req.user._id,
                });
            }
        })
    } else {
        productosDao.getAll().then(item => {
            if (item.status === 'Error') {
                res.status(500);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 500,
                    message: item.message,
                });
            } else {
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.status(200).json(item.payload);
            }
        })
    }
}

// POST /productos/
const addProduct = async (req, res) => {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 422,
            message: "Faltan datos para la creacion del producto correctamente",
        });
    } else {
        productosDao.save(body).then(item => {
            if (item.status === 'Error') {
                res.status(500);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 500,
                    message: item.message,
                });
            } else {
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.status(201).json(item.payload);
            }
        })
    }
}

// PUT /productos/:id
const updateProduct = async (req, res) => {
    const { body } = req;
    const id = req.params.id
    if (
        Object.entries(body).length === 0 ||
        Object.entries(body).length < 1
    ) {
        res.status(422);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 422,
            message: "Faltan datos para la actualizacion del producto",
        });
    } else {
        productosDao.updateById(id, body).then(item => {
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
                res.json(item.payload)
            }
        })
    }
}

// DELETE /productos/:id
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        carritosDao.deleteProductOfAllCartsById(id).then(
            productosDao.deleteById(id).then(item => {
                if (item.status == 'Error') {
                    res.status(500);
                    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                    res.render("./pages/error.ejs", {
                        code: 500,
                        message: item.message,
                    });
                } else {
                    res.status(201)
                    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                    res.json(item.payload)
                }
            })
        )
    } catch (err) {
        res.status(500);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: item.message,
        });
    }

}


export { getProducts, addProduct, updateProduct, deleteProduct }