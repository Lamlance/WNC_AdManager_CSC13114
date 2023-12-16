import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsInfo } from "../../db/service/ads-info";

const router = Router()

// Get all ads info records
router.get("/", async (req, res, next) => {
    const result = await CallAndCatchAsync(getAllAdsInfo, undefined);
    if (!result.success) {
        return res.status(500).json({ msg: result.error.message });
    }
    return res.status(200).json(result.data);
})

export default router;