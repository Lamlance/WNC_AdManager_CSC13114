import express from "express";
import cors from "cors";
import GeoJsonRouter from "./src/routes/GeoJson";
import { privateRouter, publicRouter } from "./src/routes/index";
import authRouter from "./src/routes/auth";
import { strategy as jwtStrategy, strategy } from "./src/utils/JwtPassport";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";
import passport, { use } from "passport";
import { Server as SocketIoServer } from "socket.io";
configDotenv();
import MulterMw from "./src/utils/Multer.js";
import { sendCodeToEmail } from "./src/utils/SendCodeToEmail";
import { SocketIoApi } from "@admanager/shared";
import z from "zod";
import { LogMiddleware } from "./src/utils/LogMIddleware";

const app = express();
const PORT = process.env.PORT || 4030;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(strategy);

// Swagger documentation setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(LogMiddleware);
app.get("/", function (req, res) {
  return res.status(200).json({ Hello: "World" });
});

app.post("/test", MulterMw.array("hinh_anh"), function (req, res) {
  console.log(req.files, req.body);
  return res.status(200).json({ ok: "ok" });
});

app.use("/testmail", async function (req, res) {
  sendCodeToEmail("lamhoangdien113@gmail.com", "LAM", "123", "register")
    .then((success) => {
      return res.status(201).json({
        success,
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Can not register right now!" });
    });
});

app.use("/auth", authRouter);
app.use("/api/public", publicRouter);
app.use(
  "/api",
  //passport.authenticate('jwt', { session: false }),
  privateRouter
);
app.use("/geojson", GeoJsonRouter);

const httpServer = app.listen(PORT, function () {
  console.log(`App BECanbo on http://localhost:${PORT}`);
});

const socketIo = new SocketIoServer(httpServer, {
  path: "/io",
  cors: {
    origin: "*",
  },
});

const reportNameSpace = socketIo.of("/" + SocketIoApi.SocketNameSpace[0]);
app.set(SocketIoApi.SocketNameSpace[0], reportNameSpace);

reportNameSpace.use((socket, next) => {
  const level = SocketIoApi.SocketLevelSchema.safeParse(
    socket.handshake.query.level
  );
  if (level.success == false) {
    console.log(level.error);
    return next(new Error("Missing socket level"));
  }
  return next();
});

reportNameSpace.on("connection", (socket) => {
  console.log("Connected", socket.id);
});
