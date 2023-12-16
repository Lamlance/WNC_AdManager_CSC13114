import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsInfo } from "../../db/service/ads-info";
import { getALLReportInfo } from "../../db/service/report-info";

const router = Router()

// Get all report info records
router.get("/", async (req, res, next) => {
    const result = await CallAndCatchAsync(getALLReportInfo, undefined);
    if (!result.success) {
        return res.status(500).json({ msg: result.error.message });
    }
    return res.status(200).json(result.data);
})

export default router;