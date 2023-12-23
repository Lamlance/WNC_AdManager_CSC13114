import * as passport from "passport";
import { Strategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { CallAndCatchAsync } from "./CallCatch";
import { getUserById } from "../db/service/user";
import { configDotenv } from "dotenv";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_KEY,
};

export const strategy = new Strategy(opts, async (payload, done) => {
  const result = await CallAndCatchAsync(getUserById, payload.id);

  if (result.success) {
    if (result.data) {
      return done(null, result.data);
    }
    return done(null, false);
  } else {
    return done(result.error);
  }
});
