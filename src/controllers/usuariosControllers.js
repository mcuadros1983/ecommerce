
import { usuariosDao, carritosDao } from "../daos/index.js";
import { logger, sendMailTo } from "../utils/index.js";
import bcrypt from "bcrypt";

const renderLoginView = (req, res) => {
    try {
        res.status(200)
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/login.ejs");
    } catch (err) {
        res.status(500);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const renderRegisterView = (req, res) => {
    try {
        res.status(200)
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/register.ejs");
    } catch (err) {
        res.status(500);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const { user: { _id } } = req;
        await usuariosDao.getById(_id).then(item => {
            if (item.status === "Error") {
                res.status(500);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 500,
                    message: item.message,
                });
            } else {
                res.status(200)
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/user.ejs", { user: item.payload, cartId: item.payload.cart_id });
            }
        })
    } catch (error) {
        res.status(200)
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/user.ejs", { 
            user: item.payload, 
            cartId: item.payload.cart_id,
            userId: req.user._id    
        });
        console.log("text1", item.payload, item.payload.cart_id)
    }
}

const createUser = async (req, res) => {
    try {
        const { username, email, age, address, phone, password } = req.body;
        const { file } = req;

        if (!file) {
            res.status(400);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 400,
                message: "Por favor suba un archivo",
            });
        }
        console.log("previous", email)
        await usuariosDao.getUserByEmail(email).then(async item => {
            if (item) {
                console.log("text2", item)
                res.status(409);
                logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.render("./pages/error.ejs", {
                    code: 409,
                    message: "El usuario ya se encuentra registrado",
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 8); // Encrypting the password
                const userCart = await carritosDao.save({ products: [] }); // Create a cart for this user
                const newUser = {
                    username,
                    email,
                    age,
                    address,
                    image: file.filename,
                    phone,
                    password: hashedPassword,
                    cart_id: userCart.payload._id,
                };
                console.log("newuser", userCart)
                await usuariosDao.save(newUser);
                // await sendMailTo(
                //     process.env.ADMIN_MAIL,
                //     "Nuevo registro de usuario",
                //     "Se ha registrado un nuevo usuario."
                // );
                // client.messages.create({
                //     body: "Se ha registrado un nuevo usuario.",
                //     from: process.env.TWILIO_PHONE,
                //     to: process.env.ADMIN_PHONE,
                // });

                res.status(302)
                logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
                res.redirect("/usuarios/login");
            }
        })
    } catch (err) {
        res.status(500)
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json({ error: err?.message });
    }
}

const logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500);
            logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
            res.render("./pages/error.ejs", {
                code: 500,
                message: "Internal Server Error",
            });
        }
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(302).redirect("/");
    });
}



export { renderLoginView, renderRegisterView, logout, getUserById, createUser }