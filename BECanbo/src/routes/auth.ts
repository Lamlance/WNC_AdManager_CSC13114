import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch";
import {
  createAnUser,
  getUserById,
  getAnUserByUsername,
  getAnUserByEmail,
  updateVerificationStatusOfUser,
  updatePasswordUser,
} from "../db/service/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import { ValidatorMwBuilder } from "../utils/ValidationMiddlewareBuilder";
import { AuthApi } from "@admanager/shared";
import { generate } from "randomstring";
import { sendCodeToEmail } from "../utils/SendCodeToEmail";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "abc123";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "1");

const router = Router();

type VerificationPayload = {
  userId: string;
  confirmCode: string;
};

router.post(
  "/login",
  ValidatorMwBuilder(
    undefined,
    AuthApi.LoginRequestSchema,
    async (req, res, next) => {
      const username = res.locals.body.username;
      const password = res.locals.body.pwd;

      const result = await CallAndCatchAsync(getAnUserByUsername, username);

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }
      if (!result.data) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
      const user = result.data;
      const passwordMatch = await bcrypt.compare(password, user.pwd);

      if (passwordMatch == false) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }

      const authToken = jwt.sign(user, JWT_SECRET_KEY, {
        expiresIn: "10d",
      });

      return res.status(200).json({ token: authToken, ...user });
    }
  )
);

router.post(
  "/register",
  ValidatorMwBuilder(
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
        const data = result.data;
        const confirmCode = generate({ length: 6, charset: "numeric" });

        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        const confirmCodeToken = jwt.sign(
          {
            userId: data.userId,
            confirmCode: confirmCode,
          },
          JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );
        return res.status(201).json({
          token: authToken,
          user: data,
          confirmCodeToken: confirmCodeToken,
        });
        // sendCodeToEmail(data.email, data.name, confirmCode, "register")
        //   .then((success) => {
        //     const authToken = jwt.sign(data, JWT_SECRET_KEY);
        //     const confirmCodeToken = jwt.sign(
        //       {
        //         userId: data.userId,
        //         confirmCode: confirmCode,
        //       },
        //       JWT_SECRET_KEY,
        //       { expiresIn: "5m" }
        //     );

        //     return res.status(201).json({
        //       token: authToken,
        //       user: data,
        //       confirmCodeToken: confirmCodeToken,
        //     });
        //   })
        //   .catch((err) => {
        //     return res.status(500).json({ msg: "Can not register right now!" });
        //   });
      }
    }
  )
);

router.post(
  "/verify-email",
  ValidatorMwBuilder(
    undefined,
    AuthApi.VerifyEmailRequestSchema,
    async (req, res, next) => {
      let user: VerificationPayload;
      try {
        user = jwt.verify(
          res.locals.body.confirmToken,
          JWT_SECRET_KEY
        ) as VerificationPayload;
      } catch (err) {
        return res.status(400).json({ err: "Invalid token" });
      }

      const result = await CallAndCatchAsync(getUserById, user.userId);

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }

      if (res.locals.body.code !== user.confirmCode) {
        return res.status(400).json({ err: "Invalid token" });
      }

      const data = result.data;

      if (data) {
        const result2 = await CallAndCatchAsync(
          updateVerificationStatusOfUser,
          {
            username: data.username,
            verificationStatus: true,
          }
        );

        if (!result2.success) {
          return res.status(500).json({ err: result2.error });
        }

        return res.status(200).json({
          msg: "Verify email successful!",
        });
      } else {
        return res.status(400).json({
          err: "Invalid token",
        });
      }
    }
  )
);

router.post(
  "/send-verification-code",
  ValidatorMwBuilder(
    undefined,
    AuthApi.SendVerificationCodeToEmailRequestSchema,
    async (req, res, next) => {
      const result = await CallAndCatchAsync(
        getAnUserByEmail,
        res.locals.body.email
      );

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }
      const user = result.data;

      if (user == null) {
        return res.status(400).json({ err: "Not found user by email" });
      }

      const result2 = await CallAndCatchAsync(updateVerificationStatusOfUser, {
        username: user.username,
        verificationStatus: false,
      });

      if (!result2.success) {
        return res.status(500).json({ err: result2.error });
      }

      const confirmCode = generate({ length: 6, charset: "numeric" });

      sendCodeToEmail(user.email, user.name, confirmCode, "verify-mail")
        .then((success) => {
          const confirmCodeToken = jwt.sign(
            { userId: user.userId, confirmCode },
            JWT_SECRET_KEY,
            { expiresIn: "5m" }
          );

          return res.status(200).json({
            confirmToken: confirmCodeToken,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ err: "Can not verify email right now!" });
        });
    }
  )
);

router.post(
  "/change-password-token",
  ValidatorMwBuilder(
    undefined,
    AuthApi.ChangePasswordTokenRequestSchema,
    async (req, res, next) => {
      let user: VerificationPayload;
      try {
        user = jwt.verify(
          res.locals.body.confirmToken,
          JWT_SECRET_KEY
        ) as VerificationPayload;
      } catch (err) {
        return res.status(400).json({ err: "Invalid token" });
      }

      if (res.locals.body.code !== user.confirmCode) {
        return res.status(400).json({ err: "Invalid token" });
      }

      const result = await CallAndCatchAsync(getUserById, user.userId);

      if (!result.success) {
        return res.status(500).json({ err: result.error });
      }

      const userData = result.data;

      if (userData) {
        const saltRounds = SALT_ROUNDS;
        const salt = await bcrypt.genSalt(saltRounds);
        const newHashPassword = await bcrypt.hash(
          res.locals.body.newPassword,
          salt
        );

        const result2 = await CallAndCatchAsync(updatePasswordUser, {
          username: userData.username,
          newPassword: newHashPassword,
        });

        if (!result2.success) {
          return res.status(500).json({ err: result2.error });
        }

        const updatedUser = result2.data;

        const authToken = jwt.sign(updatedUser, JWT_SECRET_KEY, {
          expiresIn: "10d",
        });

        return res.status(200).json({ authToken: authToken });
      } else {
        return res.status(400).json({ err: "Invalid token " });
      }
    }
  )
);

export default router;
