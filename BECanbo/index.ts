import express from "express";
import cors from "cors";
import GeoJsonRouter from "./src/routes/GeoJson.js";
import router from "./src/routes/index.js";

const app = express();
const PORT = 4030;

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  return res.status(200).json({ Hello: "World" });
});

app.use("/api", router);
app.use("/geojson", GeoJsonRouter);
app.listen(PORT, function () {
  console.log(`App BECanbo on http://localhost:${PORT}`);
});
