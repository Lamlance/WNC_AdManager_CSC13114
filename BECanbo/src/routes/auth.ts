import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch";
import { getAnUserByUsername, createAnUser, getUserById } from "../db/service/user";
import { UserDto } from "../types/dto/user";
import jwt from "jsonwebtoken";
import passport from "passport";
import bcrypt from "bcrypt";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 0;

const router = Router();

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await CallAndCatchAsync(getAnUserByUsername, username);

  if (!result.success) {
    return res.status(500).json({ err: result.error });
  } else {
    const user = result.data[0];
    const passwordMatch = await bcrypt.compare(password, user.mat_khau);

    if (passwordMatch) {
      const authToken = jwt.sign(user, JWT_SECRET_KEY);
      return res.status(200).json({ token: authToken });
    } else {
      return res.status(400).json({ msg: "Invalid authentication token "});
    }
  } 
});

router.post("/register", async (req, res, next) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const user: UserDto = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    role: req.body.role
  };
  const result = await CallAndCatchAsync(createAnUser, user);

  if (!result.success) {
    const error = result.error;
    return res.status(500).json({ err: error });
  } else {
    const data = result.data[0];
    const authToken = jwt.sign(data, JWT_SECRET_KEY);
    return res.status(201).json({ token: authToken });
  }
});

export default router;
