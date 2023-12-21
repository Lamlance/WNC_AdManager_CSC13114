import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsRequests } from "../../db/service/ads-request";

const router = Router();

// Get all ads request records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllAdsRequests, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }

  return res.status(200).json(result.data);
});

export default router;
