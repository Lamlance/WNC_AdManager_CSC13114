import { Handler, Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch";
import { getAllReportType } from "../../db/service/report-type";

const ReportTypeRouter = Router();

export const GetAllReportTypeMw: Handler = async function (req, res) {
  const data = await CallAndCatchAsync(getAllReportType, undefined);
  if (data.success == false) return res.status(500).json({ error: data.error });

  return res.status(200).json(data);
};

ReportTypeRouter.get("/", async function (req, res) {
  const data = await CallAndCatchAsync(getAllReportType, undefined);
  if (data.success == false) return res.status(500).json({ error: data.error });

  return res.status(200).json(data);
});

export default ReportTypeRouter;
