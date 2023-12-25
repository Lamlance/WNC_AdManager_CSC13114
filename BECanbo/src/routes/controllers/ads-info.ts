import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import { GetQuangManyCaoData } from "../../db/service/ads-info.js";
import { AdsGeoJson } from "@admanager/shared";

const router = Router();

// Get all ads info records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(GetQuangManyCaoData, undefined);
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
});

export default router;
