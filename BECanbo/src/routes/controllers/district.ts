import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { GetAllDistrict } from "../../db/service/district";
const router = Router();

router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(GetAllDistrict, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

export default router;
