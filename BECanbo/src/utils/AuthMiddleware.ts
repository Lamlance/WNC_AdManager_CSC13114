import { Handler } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "abc123";

export const CheckJwtMiddleware: Handler = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing auth token" });

  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
