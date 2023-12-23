import express from "express";
import cors from "cors";
import GeoJsonRouter from "./src/routes/GeoJson";
import router from "./src/routes/index";
import authRouter from "./src/routes/auth";
import { strategy as jwtStrategy, strategy } from "./src/utils/JwtPassport"
import { configDotenv } from "dotenv";
import passport from "passport";

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize())

passport.use(strategy);

app.get("/", function (req, res) {
  return res.status(200).json({ Hello: "World" });
});

app.use("/auth", authRouter);
app.use("/api", passport.authenticate('jwt', { session: false }), router);
app.use("/geojson", GeoJsonRouter);
app.listen(PORT, function () {
  console.log(`App BECanbo on http://localhost:${PORT}`);
});
