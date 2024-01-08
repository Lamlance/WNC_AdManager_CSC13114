import express from "express";
import cors from "cors";
import GeoJsonRouter from "./src/routes/GeoJson";
import { privateRouter, publicRouter } from "./src/routes/index";
import authRouter from "./src/routes/auth";
import { strategy as jwtStrategy, strategy } from "./src/utils/JwtPassport";
import { configDotenv } from "dotenv";
import passport from "passport";

configDotenv();
import MulterMw from "./src/utils/Multer.js";
import { sendCodeToEmail } from "./src/utils/SendCodeToEmail";

const app = express();
const PORT = process.env.PORT || 4030;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
passport.use(strategy);

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
app.listen(PORT, function () {
  console.log(`App BECanbo on http://localhost:${PORT}`);
});
