import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllAdsBoardType } from "../../db/service/ads-board";

const AdsBoardRouter = Router();
AdsBoardRouter.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(getAllAdsBoardType, undefined);
  if (data.success == false) return res.status(500).json(data);
  return res.status(200).json(data);
});
export default AdsBoardRouter;
