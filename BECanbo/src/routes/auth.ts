import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch";
import {
  getAnUserByUsername,
  createAnUser,
  getUserById,
} from "../db/service/user";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import { ValidatorMwBuilder } from "../utils/ValidationMiddlewareBuilder";
import { AuthApi } from "@admanager/shared";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "0");

const router = Router();

router.get("/login", ValidatorMwBuilder(
  undefined,
  AuthApi.LoginRequestSchema,
  async (req, res, next) => {  
    const username = res.locals.body.username;
    const password = res.locals.body.pwd;

    const result = await CallAndCatchAsync(getAnUserByUsername, username);
  
    if (!result.success) {
      return res.status(500).json({ err: result.error });
    } else {
      const user = result.data[0];
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.pwd);
  
        if (passwordMatch) {
          const authToken = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: "10d" });
          return res.status(200).json({ token: authToken, ...user });
        } else {
          return res.status(400).json({ msg: "Invalid username or password" });
        }
      } else {
        return res
          .status(400)
          .json({ msg: "Invalid username or password" });
      }
    }
  }
));

router.post("/register", ValidatorMwBuilder(
  undefined,
  AuthApi.RegisterRequestSchema,
  async (req, res, next) => {
    const saltRounds = SALT_ROUNDS;
    const salt = await bcrypt.genSalt(saltRounds);

    res.locals.body.pwd = await bcrypt.hash(res.locals.body.pwd, salt);
  
    const result = await CallAndCatchAsync(createAnUser, res.locals.body);
    if (!result.success) {
      const error = result.error;
      return res.status(500).json({ err: error });
    } else {
      const data = result.data[0];
      const authToken = jwt.sign(data, JWT_SECRET_KEY);
      return res.status(201).json({ token: authToken });
    }
  }
));

export default router;
