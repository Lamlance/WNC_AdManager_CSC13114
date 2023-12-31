import { configDotenv } from "dotenv";
import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { AuthApi } from "@admanager/shared";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getUserById, updatePasswordUser } from "../../db/service/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "0");

const router = Router();

type UserDto = {
  userId: string;
  username: string;
  name: string;
  accLevel: string;
  pwd: string;
  email: string;
  phone: string;
  isActivated: boolean;
};

router.post(
  "/change-password",
  ValidatorMwBuilder(
    undefined,
    AuthApi.ChangePasswordSchema,
    async (req, res, next) => {
      const user = req.user as UserDto;
      const result = await CallAndCatchAsync(getUserById, user.userId);

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }
      const userData = result.data;

      const isPasswordMatch = await bcrypt.compare(user.pwd, userData.pwd);

      if (isPasswordMatch) {
        const saltRounds = SALT_ROUNDS;
        const salt = await bcrypt.genSalt(saltRounds);

        const newHashPassword = await bcrypt.hash(
          res.locals.body.newPassword,
          salt
        );

        const result = await CallAndCatchAsync(updatePasswordUser, {
          username: userData.username,
          newPassword: newHashPassword,
        });

        if (!result.success) {
          return res.status(500).json({ err: result.error });
        }

        const user = result.data;

        const authToken = jwt.sign(user, JWT_SECRET_KEY, {
          expiresIn: "10d",
        });

        return res.status(200).json({ token: authToken, user });
      } else {
        return res.status(400).json({ msg: "Invalid password " });
      }
    }
  )
);
