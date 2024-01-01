import express from "express";
import cors from "cors";
import GeoJsonRouter from "./src/routes/GeoJson";
import router from "./src/routes/index";
import authRouter from "./src/routes/auth";
import { strategy as jwtStrategy, strategy } from "./src/utils/JwtPassport";
import { configDotenv } from "dotenv";
import passport from "passport";

configDotenv();
import MulterMw from "./src/utils/Multer.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

passport.use(strategy);

app.get("/", function (req, res) {
  return res.status(200).json({ Hello: "World" });
});

app.post("/test", MulterMw.array("hinh_anh"), function (req, res) {
  console.log(req.files, req.body);
  return res.status(200).json({ ok: "ok" });
});

app.use("/auth", authRouter);
app.use("/api", router);
app.use("/geojson", GeoJsonRouter);
app.listen(PORT, function () {
  console.log(`App BECanbo on http://localhost:${PORT}`);
});
