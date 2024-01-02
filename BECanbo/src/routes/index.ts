import { Router } from "express";
import adsInfoRouter from "./controllers/ads-info.js";
import adsRequestRouter from "./controllers/ads-request.js";
import reportInfoRouter from "./controllers/report-info.js";
import PlaceRouter from "./controllers/place-info.js";
import adMethodRouter from "./controllers/ads-method.js";
import reportTypeRouter from "./controllers/reports-type.js";
import ImageRouter from "./controllers/images.js";
import WardRouter from "./controllers/ward.js";
import DistrictRouter from "./controllers/district.js";

const privateRouter = Router();

const publicRouter = Router();

privateRouter.use("/quang-cao", adsInfoRouter);
privateRouter.use("/yeu-cau-quang-cao", adsRequestRouter);
privateRouter.use("/cap-phep-quang-cao", adsRequestRouter);
privateRouter.use("/bao-cao", reportInfoRouter);
privateRouter.use("/quan", DistrictRouter);
privateRouter.use("/phuong", WardRouter);
privateRouter.use("/dia-diem", PlaceRouter);
privateRouter.use("/hinh-thuc-quang-cao", adMethodRouter);
privateRouter.use("/loai-bao-cao", reportTypeRouter);
privateRouter.use("/image", ImageRouter);
publicRouter.use("/phuong", WardRouter);

export { privateRouter, publicRouter };