import { configDotenv } from "dotenv";
import { Router } from "express";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { AuthApi } from "@admanager/shared";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getUserById } from "../../db/service/user";
import bcrypt from "bcrypt";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "0");

const router = Router();

router.post(
  "/change-password",
  ValidatorMwBuilder(
    undefined,
    AuthApi.ChangePasswordSchema,
    async (req, res, next) => {
    //   const result = await CallAndCatchAsync(getUserById);

    //   if (!result.success) {
    //     return res.status(500).json({ err: result.error });
    //   }

    //   const userData = result.data[0];
    //   const passwordMatch = await bcrypt.compare(
    //     res.locals.body.oldPassword,
    //     userData.pwd
    //   );
    }
  )
);