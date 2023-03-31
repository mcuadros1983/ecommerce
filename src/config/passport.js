import { usuariosDao } from "../daos/index.js";
import passport from "passport"
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy } from "passport-local";

const saltRounds = 2;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {

      // Match Email's User
      const users = await usuariosDao.getAll();
      const user = users.find((user) => user.email == email);

      if (!user) {
        return done(null, false, { message: "User not found." });
      }

      // Match Password's User
      const isMatch = bcrypt.compareSync(password, user.password);
      console.log(isMatch);
      if (!isMatch)
        return done(null, false, { message: "Incorrect username or password." });

      return done(null, user);
    }
  )
);

// passport.use(
//   "register",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async (email, password, done) => {
//       // Look for email coincidence
//       const users = await usuariosDao.getAll();
//       const userFound = users.find((user) => user.email === email);
//       if (userFound) {
//         return done(null, false);
//       }

//       // Saving a New User
//       const passwordEncrypt = await bcrypt.hash(password, saltRounds);
//       const user = { email, password: passwordEncrypt };
//       const userSave = await usuariosDao.save(user);
//       return done(null, user);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  const users = await usuariosDao.getAll();
  const user = users.find((user) => user.email === email);
  done(null, user);
});
