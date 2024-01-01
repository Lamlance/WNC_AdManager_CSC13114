import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import { getAllReportsType, createReportType, updateReportType, deleteReportType, } from "../../db/service/reports-type.js";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";
import { ReportApi } from "@admanager/shared";
const router = Router();

// Get all report type
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllReportsType, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  return res.status(200).json(result.data);
});

router.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    ReportApi.ReportTypeSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(createReportType, res.locals.body);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.put(
  "/:id",
  ValidatorMwBuilder(
    undefined,
    ReportApi.ReportTypeSchema,
    async function (req, res) {
      const { id } = req.params;
      const data: ReportApi.ReportTypeProperty = {
        id_loai_bc: Number(id),
        loai_bao_cao: res.locals.body.loai_bao_cao,
        // so_bao_cao: res.locals.body.so_bao_cao,
      };
      const result = await CallAndCatchAsync(updateReportType, data);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.delete(
  "/:id",
  ValidatorMwBuilder(
    undefined,
    ReportApi.ReportTypeSchema,
    async function (req, res) {
      const { id } = req.params;
      const data: ReportApi.ReportTypeProperty = {
        id_loai_bc: Number(id),
        loai_bao_cao: "",
      };
      const result = await CallAndCatchAsync(deleteReportType, data);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);


export default router;