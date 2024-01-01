import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import { GetQuangManyCaoData } from "../../db/service/ads-info.js";
import { AdsGeoJson } from "@admanager/shared";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";
import z from "zod";
import { PhuongIdArrayScheama } from "../../utils/PhuongIdArray.js";

const router = Router();

// Get all ads info records
router.get(
  "/",
  ValidatorMwBuilder(
    z.object({
      phuong_id: PhuongIdArrayScheama.nullish(),
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

router.get("/test", async (req, res, next) => {
  return res.status(200).json(req.user);
})

router.get("/test", async (req, res, next) => {
  return res.status(200).json(req.user);
})

export default router;
