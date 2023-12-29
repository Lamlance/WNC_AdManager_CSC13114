import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import {
  createAdChangeRequest,
  createAdRequest,
  getAllAdsChangeRequest,
  getAllAdsRequests,
  updateAdChangeStatusRequest,
  updateAdStatusRequest,
  // saveAdsRequest,
} from "../../db/service/ads-request.js";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";
import { AdChangeApi, AdsReqApi } from "@admanager/shared";

const router = Router();

// Get all ads request records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(getAllAdsRequests, undefined);
  if (!result.success) {
    return res.status(500).json({ error: result.error.message });
  }

  return res.status(200).json(result.data);
});

router.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    AdsReqApi.AdRequestCreateSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(createAdRequest, res.locals.body);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.get("/chinh-sua", async function (req, res) {
  const result = await CallAndCatchAsync(getAllAdsChangeRequest, undefined);
  if (!result.success) {
    return res.status(500).json({ error: result.error.message });
  }

  return res.status(200).json(result.data);
});

router.post(
  "/chinh-sua",
  ValidatorMwBuilder(
    undefined,
    AdChangeApi.AdChangeRequestCreateSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(
        createAdChangeRequest,
        res.locals.body
      );
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.put(
  "/chinh-sua/:id",
  ValidatorMwBuilder(
    undefined,
    AdChangeApi.AdChangeStatusRequestUpdateSchema,
    async function (req, res) {
      const { id } = req.params;

      const result = await CallAndCatchAsync(updateAdChangeStatusRequest, {
        id_yeu_cau: Number(id),
        trang_thai: res.locals.body.trang_thai,
      });

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
    AdsReqApi.AdRequestUpdateStatusSchema2,
    async function (req, res) {
      const { id } = req.params;

      const result = await CallAndCatchAsync(updateAdStatusRequest, {
        id_yeu_cau: Number(id),
        trang_thai: res.locals.body.trang_thai,
      });

      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

export default router;
