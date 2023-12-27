import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import { getAllAdsMethod } from "../../db/service/ads-method.js";

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
