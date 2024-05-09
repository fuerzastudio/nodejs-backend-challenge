import { Login } from "@prisma/client";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { jwtScret } from "../config";
import loginModel from "../models/login";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtScret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload: any, done) => {
    try {
      const login = await loginModel.findByEmail(payload.email);

      if (!login)
        return done(null, false, { message: "Login não encontrado." });

      return done(null, login);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser((login, done) => {
  done(null, login);
});

passport.deserializeUser((login: Login, done) => {
  done(null, login);
});
