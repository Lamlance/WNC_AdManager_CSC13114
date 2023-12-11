import { Router } from "express"
import adsInfoRouter from "./controllers/ads-info"

const router = Router();

router.use("/quang-cao", adsInfoRouter);

export default router;