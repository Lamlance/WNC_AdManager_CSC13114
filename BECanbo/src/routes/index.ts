import { Router } from "express";
import adsInfoRouter from "./controllers/ads-info";
import adsRequestRouter from "./controllers/ads-request";
import reportInfoRouter from "./controllers/report-info";

const router = Router();

router.use("/quang-cao", adsInfoRouter);
router.use("/yeu-cau-cap-phep", adsRequestRouter);
router.use("/bao-cao", reportInfoRouter);

export default router;
