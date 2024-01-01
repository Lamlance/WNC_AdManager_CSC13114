import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsInfo } from "../../db/service/ads-info";
import {
  createReportInfo,
  getALLReportInfo,
} from "../../db/service/report-info";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { AdsZodSchema } from "@admanager/backend";
import MulterMw from "../../utils/Multer";
import { Minio_UploadImg, Minio_UploadMulterImgs } from "../../db/minio";
import z from "zod";
import { PhuongIdArrayScheama } from "../../utils/PhuongIdArray";

const GetALLReportInfoQuery = z.object({
  phuong_id: PhuongIdArrayScheama.nullish(),
});

const router = Router();

// Get all report info records
router.get(
  "/",
  ValidatorMwBuilder(
    GetALLReportInfoQuery,
    undefined,
    async (req, res, next) => {
      const result = await CallAndCatchAsync(getALLReportInfo, {
        phuong_id: res.locals.query.phuong_id || undefined,
      });
      if (!result.success) {
        return res.status(500).json({ msg: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.post(
  "/",
  MulterMw.array("hinh_anh"),
  ValidatorMwBuilder(
    undefined,
    AdsZodSchema.createBaoCaoSchema,
    async function (req, res) {
      const files = (req.files as Express.Multer.File[]) || [];
      const uploadImgs = await Promise.allSettled(
        Minio_UploadMulterImgs({
          bkName: "adsreports",
          files,
        })
      );

      if (uploadImgs[0].status === "fulfilled" && files[0]) {
        res.locals.body.hinh_1 = files[0].filename;
      }

      if (uploadImgs[1].status === "fulfilled" && files[1]) {
        res.locals.body.hinh_2 = files[1].filename;
      }

      const data = await CallAndCatchAsync(createReportInfo, res.locals.body);
      if (data.success == false)
        return res.status(500).json({ error: data.error });
      if (data.data) return res.status(200).json(data.data);
      return res.status(500).json({ error: "Cant create BaoCao" });
    }
  )
);

export default router;
