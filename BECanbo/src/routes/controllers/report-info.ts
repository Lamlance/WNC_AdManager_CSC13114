import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsInfo } from "../../db/service/ads-info";
import {
  createReportInfo,
  getALLReportInfo,
} from "../../db/service/report-info";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder";
import { AdsZodSchema } from "@admanager/backend";

const router = Router();

// Get all report info records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getALLReportInfo, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

router.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    AdsZodSchema.createBaoCaoSchema,
    async function (req, res) {
      const data = await CallAndCatchAsync(createReportInfo, res.locals.body);
      if (data.success == false)
        return res.status(500).json({ error: data.error });
      if (data.data) return res.status(200).json(data.data);
      return res.status(500).json({ error: "Cant create BaoCao" });
    }
  )
);

export default router;
