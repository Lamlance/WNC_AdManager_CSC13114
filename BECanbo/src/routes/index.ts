import { Router } from "express";
import adsInfoRouter from "./controllers/ads-info.js";
import adsRequestRouter from "./controllers/ads-request.js";
import reportInfoRouter from "./controllers/report-info.js";
import PlaceRouter from "./controllers/place-info.js";
import adMethodRouter from "./controllers/ads-method.js";
import ImageRouter from "./controllers/images.js";
import WardRouter from "./controllers/ward.js";

const router = Router();

router.use("/quang-cao", adsInfoRouter);
router.use("/yeu-cau-quang-cao", adsRequestRouter);
router.use("/cap-phep-quang-cao", adsRequestRouter);
router.use("/bao-cao", reportInfoRouter);
router.use("/dia-diem", PlaceRouter);
router.use("/hinh-thuc-quang-cao", adMethodRouter);
router.use("/image", ImageRouter);
router.use("/phuong", WardRouter);

export default router;
