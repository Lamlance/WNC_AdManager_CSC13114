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
  secretOrKey: JWT_SECRET_KEY || "abc123",
};

function isTokenExpired(payload: any) {
  const exp = payload.exp;
  const expired = Date.now() >= exp * 1000;
  return expired;
}

export const strategy = new Strategy(opts, async (payload, done) => {
  if (!isTokenExpired(payload)) {
    if (payload) {
      return done(null, payload);
    }
    return done(null, false);
  } else {
    return done(new Error("The token is expired!"));
  }
});
