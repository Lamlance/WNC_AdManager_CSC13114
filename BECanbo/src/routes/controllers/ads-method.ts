import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import {
  createAdMethod,
  getAllAdsMethod,
  updateAdMethod,
} from "../../db/service/ads-method.js";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";
import { AdsGeoJson } from "@admanager/shared";
const router = Router();

// Get all ads method
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllAdsMethod, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

export default router;

router.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    AdsGeoJson.AdMethodCreateSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(createAdMethod, res.locals.body);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.put(
  "/:id",
  ValidatorMwBuilder(
    undefined,
    AdsGeoJson.AdMethodUpdateSchema,
    async function (req, res) {
      const { id } = req.params;
      const data: AdsGeoJson.AdMethodProperty = {
        id_htqc: Number(id),
        hinh_thuc_qc: res.locals.body.hinh_thuc_qc,
      };
      const result = await CallAndCatchAsync(updateAdMethod, data);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);
