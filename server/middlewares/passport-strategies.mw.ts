import passport from "passport";
import { Strategy } from "passport-local";
import passportJWT, { Strategy as JWTStrategy } from "passport-jwt";
import { Application } from "express";

import db from "../db";
import { compareHash } from "../utils/passwords";
import config from "../config";

import { Payload } from "../types";

export const configurePassport = (app: Application) => {
  //set up our local strat
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        //check email is alright
        const [userFound] = await db.users.find("email", email);

        if (!userFound || userFound.length === 0) return done(null, false);

        //check password matches
        const pwResult = await compareHash(password, userFound.password);
        if (!pwResult) return done(null, false);

        //finally if everything is good return the user
        delete userFound.password;
        console.log(userFound);
        return done(null, userFound);
      } catch (error) {
        done(error);
      }
    })
  );
  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
      },
      (payload: Payload, done) => {
        try {
          done(null, payload);
        } catch {}
      }
    )
  );
  //initialize passport
  app.use(passport.initialize());
};
