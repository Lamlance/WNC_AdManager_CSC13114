import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import {
  CreateAds,
  GetQuangManyCaoData,
  UpdateAdsData,
} from "../../db/service/ads-info.js";
import { AdChangeApi, AdsGeoJson } from "@admanager/shared";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";
import z from "zod";
import { WardArraySchema } from "../../utils/WardArray.js";
import MulterMw from "../../utils/Multer.js";
import { Minio_UploadMulterImgs } from "../../db/minio.js";
const router = Router();

// Get all ads info records
router.get(
  "/",
  ValidatorMwBuilder(
    z.object({
      phuong_id: WardArraySchema.nullish(),
    }),
    undefined,
    async (req, res, next) => {
      const result = await CallAndCatchAsync(GetQuangManyCaoData, {
        phuong_id: res.locals.query.phuong_id || undefined,
      });
      if (!result.success) {
        return res.status(500).json({ msg: result.error.message });
      }
      const flattenData: AdsGeoJson.AdsGeoJsonProperty[] = Object.values(
        result.data
      ).map((v) => ({
        ads: v.ads,
        place: v.dd,
      }));
      return res.status(200).json(flattenData);
    }
  )
);

router.post(
  "/",
  MulterMw.array("hinh_anh"),
  ValidatorMwBuilder(
    undefined,
    AdChangeApi.AdCreateBodySchema,
    async function (req, res) {
      const files = (req.files as Express.Multer.File[]) || [];
      const uploadImgs = await Promise.allSettled(
        Minio_UploadMulterImgs({ bkName: "adsreports", files })
      );

      if (uploadImgs[0]?.status === "fulfilled" && files[0]) {
        res.locals.body.hinh_1 = files[0].filename;
      }

      if (uploadImgs[1]?.status === "fulfilled" && files[1]) {
        res.locals.body.hinh_2 = files[1].filename;
      }

      const data = await CallAndCatchAsync(CreateAds, res.locals.body);
      if (data.success == false) return res.status(500).json(data);
      return res.status(200).json(data.data);
    }
  )
);

router.put(
  "/",
  MulterMw.array("hinh_anh"),
  ValidatorMwBuilder(
    undefined,
    AdChangeApi.AdChangeDataSchema.required({ id_quang_cao: true }),
    async function (req, res) {
      const files = (req.files as Express.Multer.File[]) || [];
      const uploadImgs = await Promise.allSettled(
        Minio_UploadMulterImgs({ bkName: "adsreports", files })
      );

      if (uploadImgs[0]?.status === "fulfilled" && files[0]) {
        res.locals.body.hinh_1 = files[0].filename;
      }

      if (uploadImgs[1]?.status === "fulfilled" && files[1]) {
        res.locals.body.hinh_2 = files[1].filename;
      }
      const data = await CallAndCatchAsync(UpdateAdsData, res.locals.body);
      if (data.success == false) return res.status(500).json(data);

      return res.status(200).json(data);
    }
  )
);

export default router;
