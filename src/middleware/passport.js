//import User from "../models/User.js";
import { usuariosDao } from "../daos/index.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await usuariosDao.getUserByEmail(email);
        console.log("user", user)
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          try {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
          } catch (err) {
            return done(err);
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  const users = await usuariosDao.getAll();
  const user = await usuariosDao.getUserByEmail( email );
  done(null, user);
});