import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllLandType } from "../../db/service/land-type";

const LandTypeRouter = Router();
LandTypeRouter.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(getAllLandType, undefined);
  if (data.success == false) return res.status(500).json(data);
  return res.status(200).json(data);
});
export default LandTypeRouter;
