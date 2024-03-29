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
import MulterMw from "../../utils/Multer.js";
import { Minio_UploadImg } from "../../db/minio.js";
import z from "zod";
import { WardArraySchema } from "../../utils/WardArray.js";
const router = Router();

// Get all ads request records
router.get(
  "/",
  ValidatorMwBuilder(
    z.object({
      phuonf_id: WardArraySchema.nullish(),
    }),
    undefined,
    async (req, res, next) => {
      const result = await CallAndCatchAsync(getAllAdsRequests, {
        phuong_id: res.locals.query.phuonf_id || undefined,
      });
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }

      return res.status(200).json(result.data);
    }
  )
);

router.post(
  "/",
  MulterMw.array("hinh_anh"),
  ValidatorMwBuilder(
    undefined,
    AdsReqApi.AdRequestCreateSchema,
    async function (req, res) {
      const files = (req.files as Express.Multer.File[]) || [];
      const promises: Promise<any>[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        promises.push(
          Minio_UploadImg({
            bkName: "adsrequest",
            filename: f.filename,
            filePath: f.path,
            delAfterLoad: false,
          })
        );
      }
      const settled = await Promise.allSettled(promises);
      if (files[0]) res.locals.body.hinh_anh = files[0].filename;
      if (files[1]) res.locals.body.hinh_anh_2 = files[1].filename;

      const result = await CallAndCatchAsync(createAdRequest, res.locals.body);
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }

      return res.status(200).json(result.data);
    }
  )
);

router.get(
  "/chinh-sua",
  ValidatorMwBuilder(
    z.object({
      phuong_id: WardArraySchema.nullish(),
    }),
    undefined,
    async function (req, res) {
      const result = await CallAndCatchAsync(getAllAdsChangeRequest, {
        phuong_id: res.locals.query.phuong_id || undefined,
      });
      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }

      return res.status(200).json(result.data);
    }
  )
);

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
      return res.status(200).json({ ...result, data: undefined });
    }
  )
);

export default router;
