import { Router } from "express";
import { CallAndCatchAsync } from "../../utils/CallCatch.js";
import {
  CreateQuangManyCaoData,
  GetQuangManyCaoData,
  UpdateQuangManyCaoData,
} from "../../db/service/ads-info.js";
import { AdsGeoJson, AdsReqApi } from "@admanager/shared";
import { ValidatorMwBuilder } from "../../utils/ValidationMiddlewareBuilder.js";

const router = Router();

// Get all ads info records
router.get("/", async (req, res, next) => {
  const result = await CallAndCatchAsync(GetQuangManyCaoData, undefined);
  if (!result.success) {
    return res.status(500).json({ msg: result.error.message });
  }
  const flattenData: AdsGeoJson.AdsGeoJsonProperty[] = Object.values(
    result.data
  ).map((v) => ({
    ads: v.ads,
    place: v.dd,
  }));
  return res.status(200).json(flattenData);
});

router.post(
  "/",
  ValidatorMwBuilder(
    undefined,
    AdsGeoJson.AdsProPertyCreateSchema,
    async function (req, res) {
      const result = await CallAndCatchAsync(
        CreateQuangManyCaoData,
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
  "/:id",
  ValidatorMwBuilder(
    undefined,
    AdsGeoJson.AdsPropertySchema,
    async function (req, res) {
      const { id } = req.params;
      const data = {
        id_quang_cao: id,

        ngay_hieu_luc: res.locals.body.ngay_hieu_luc,
        ngay_het_han: res.locals.body.ngay_het_han,
        quy_hoach: res.locals.body.quy_hoach,
        hinh_1: res.locals.body.hinh_1,
        hinh_2: res.locals.body.hinh_2,

        so_luong: res.locals.body.so_luong,
        chieu_dai_m: res.locals.body.chieu_dai_m,
        chieu_rong_m: res.locals.body.chieu_rong_m,

        loai_vitri: res.locals.body.loai_vitri,
        hinh_thuc: res.locals.body.hinh_thuc,
        bang_qc: res.locals.body.bang_qc,
        ten_dia_diem: res.locals.body.ten_dia_diem,
        dia_chi: res.locals.body.dia_chi,
      };

      const result = await CallAndCatchAsync(UpdateQuangManyCaoData, data);

      if (!result.success) {
        return res.status(500).json({ error: result.error.message });
      }
      return res.status(200).json(result.data);
    }
  )
);

router.get("/test", async (req, res, next) => {
  return res.status(200).json(req.user);
});

export default router;
