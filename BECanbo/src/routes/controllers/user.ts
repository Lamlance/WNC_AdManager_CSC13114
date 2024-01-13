import { configDotenv } from "dotenv";
import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { AuthApi } from "@admanager/shared";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import {
  getAllUsers,
  getUserById,
  updatePasswordUser,
  updateUser,
} from "../../db/service/user";
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

router.get("/all", async function (req, res) {
  const data = await CallAndCatchAsync(getAllUsers, undefined);
  if (data.success == false) return res.status(500).json({ err: data.error });

  return res.status(200).json(data);
});

router.post(
  "/change-password",
  ValidatorMwBuilder(
    undefined,
    AuthApi.ChangePasswordRequestSchema,
    async (req, res, next) => {
      const user = req.user as UserDto;
      const result = await CallAndCatchAsync(getUserById, user.userId);

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }
      const userData = result.data;
      if (!userData) {
        return res.status(500).json({ err: "user not found" });
      }
      const isPasswordMatch = await bcrypt.compare(res.locals.body.oldPassword, userData.pwd);

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

router.put(
  "/:user_id",
  ValidatorMwBuilder(
    undefined,
    AuthApi.UserUpdateRequestSchema.partial(),
    async (req, res) => {
      if (!req.params.user_id)
        return res.status(400).json({ err: "Missing user id" });

      const data = await CallAndCatchAsync(updateUser, {
        update: res.locals.body,
        id_tk: req.params.user_id,
      });
      if (data.success == false)
        return res.status(500).json({ err: data.error });
      return res.status(200).json({ status: "success" });
    }
  )
);

export default router;
