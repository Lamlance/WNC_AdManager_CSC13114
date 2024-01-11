import { Router } from "express";
import adsInfoRouter from "./controllers/ads-info.js";
import adsRequestRouter from "./controllers/ads-request.js";
import reportInfoRouter from "./controllers/report-info.js";
import PlaceRouter from "./controllers/place-info.js";
import adMethodRouter from "./controllers/ads-method.js";
import ImageRouter from "./controllers/images.js";
import WardRouter from "./controllers/ward.js";
import UserRouter from "./controllers/user.js";
import DistrictRouter from "./controllers/district.js";
import ReportTypeRouter from "./controllers/report-type.js";
import AdsBoardRouter from "./controllers/ad-board.js";
import LandTypeRouter from "./controllers/land-type.js";
import { CheckJwtMiddleware } from "../utils/AuthMiddleware.js";
import StatsRouter from "./controllers/stats.js";

const privateRouter = Router();

const publicRouter = Router();
//privateRouter.use(CheckJwtMiddleware);

privateRouter.use("/quang-cao", adsInfoRouter);
privateRouter.use("/yeu-cau-quang-cao", adsRequestRouter);
privateRouter.use("/cap-phep-quang-cao", adsRequestRouter);
privateRouter.use("/bao-cao", reportInfoRouter);
privateRouter.use("/dia-diem", PlaceRouter);
privateRouter.use("/hinh-thuc-quang-cao", adMethodRouter);
privateRouter.use("/image", ImageRouter);
privateRouter.use("/user", UserRouter);
privateRouter.use("/loai-bc", ReportTypeRouter);
privateRouter.use("/bang-qc", AdsBoardRouter);
privateRouter.use("/vi-tri", LandTypeRouter);
privateRouter.use("/thong-ke", StatsRouter);

publicRouter.use("/phuong", WardRouter);
publicRouter.use("/quan", DistrictRouter);

export { privateRouter, publicRouter };
