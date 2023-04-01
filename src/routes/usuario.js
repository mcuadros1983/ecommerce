import { Router } from "express";
import { getUserById, renderLoginView, renderRegisterView, logout, createUser, } from '../controllers/usuariosControllers.js'
import upload from "../config/multer.js";
import passport from "passport";
import isAuth from "../middleware/isAuth.js";

const userRouter = Router();

// [GET] 🌐/usuarios/
userRouter.get("/", isAuth, getUserById);

// [GET] 🌐/usuarios/login
userRouter.get("/login", renderLoginView);

// [POST] 🌐/usuarios/login
userRouter.post("/login", passport.authenticate("login", {
    successRedirect: '/', //redirect es con método get, vamos a home.
    failureRedirect: `/error/`, // redirect es con método get, vamos a /login de get.
    failureMessage: true  // nos permite enviar mensajes.
})
);


// [GET] 🌐/usuarios/logout
userRouter.get("/logout", logout);

// [GET] 🌐/usuarios/register
userRouter.get("/register", renderRegisterView);

// [POST] 🌐/usuarios/register
userRouter.post("/register", upload.single("image"), createUser);




export default userRouter;