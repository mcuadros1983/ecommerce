import { Router } from "express";
// import { getUsers, getUsersById, addUser, updateUser, deleteUser} from "../controllers/usuariosControllers.js"
import { getUserById, renderLoginView, renderRegisterView, logout, createUser,  } from '../controllers/usuariosControllers.js'
//import logginMiddleware from "../middleware/login.js";
import upload from "../config/multer.js";
import passport from "passport";

const userRouter = Router();

// [GET] 🌐/usuarios/
userRouter.get("/", getUserById);

// [GET] 🌐/usuarios/login
userRouter.get("/login", renderLoginView);

// [POST] 🌐/usuarios/login
//userRouter.post("/login", logginMiddleware);
userRouter.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/usuarios/login",
    failureMessage: true,
})
);

// [GET] 🌐/usuarios/logout
userRouter.get("/logout", logout);

// [GET] 🌐/usuarios/register
userRouter.get("/register", renderRegisterView);

// [POST] 🌐/usuarios/register
userRouter.post("/register", upload.single("image"), createUser);




export default userRouter;