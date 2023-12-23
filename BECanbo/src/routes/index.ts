import { Router } from "express"
import adsInfoRouter from "./controllers/ads-info"
import adsRequestRouter from "./controllers/ads-request"
import reportInfoRouter from "./controllers/report-info"
import authRouter from "./auth"

const router = Router();

router.use("/quang-cao", adsInfoRouter);
router.use("/yeu-cau-quang-cao", adsRequestRouter);
router.use("/bao-cao", reportInfoRouter);

export default router;