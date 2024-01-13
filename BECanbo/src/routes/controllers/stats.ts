import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { GetWardStats } from "../../db/service/stats";

const StatsRouter = Router();
StatsRouter.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(GetWardStats, undefined);
  if (data.success == false) return res.status(500).json(data);

  return res.status(200).json(data.data);
});

export default StatsRouter;
