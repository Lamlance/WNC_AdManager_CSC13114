import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import {
  getAllAdsRequests,
  saveAdsRequest,
} from "../../db/service/ads-request";

const router = Router();

// Get all ads request records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllAdsRequests, undefined);
  if (!result.success) {
    return res.status(500).json({ error: result.error.message });
  }
  return res.status(200).json(result.data);
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await CallAndCatchAsync(saveAdsRequest, req.body);

    if (!result.success) {
      return res.status(500).json({ msg: result.error.message });
    }

    return res.status(201).json(result.data);
  } catch (error) {
    console.error("Error handling ads request:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});
export default router;
