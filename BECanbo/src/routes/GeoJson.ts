import { AdsSchema } from "@admanager/backend";
import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch.js";
import { eq } from "drizzle-orm";
import { AdsGeoJson } from "@admanager/shared";
import { pg_client } from "../db/db.js";

async function GetQuangCaoData() {
  const data = await pg_client
    .select({
      dia_diem: AdsSchema.DiaDiem,
      quang_cao: AdsSchema.QuangCao,
      loai_vitri: AdsSchema.LoaiViTri.loai_vitri,
      hinh_thuc: AdsSchema.HinhThucQC.hinh_thuc_qc,
      bang_qc: AdsSchema.LoaiBangQC.loai_bang_qc,
    })
    .from(AdsSchema.QuangCao)
    .innerJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.QuangCao.id_dia_diem, AdsSchema.DiaDiem.id_dia_diem)
    )
    .innerJoin(
      AdsSchema.LoaiViTri,
      eq(AdsSchema.LoaiViTri.id_loai_vt, AdsSchema.QuangCao.id_loai_vitri)
    )
    .innerJoin(
      AdsSchema.HinhThucQC,
      eq(AdsSchema.HinhThucQC.id_htqc, AdsSchema.QuangCao.id_hinh_thuc)
    )
    .innerJoin(
      AdsSchema.LoaiBangQC,
      eq(
        AdsSchema.LoaiBangQC.id_loai_bang_qc,
        AdsSchema.QuangCao.id_loai_bang_qc
      )
    );

  const grp_by_location: {
    [key: number]: {
      ads: AdsGeoJson.AdsProperty[];
      dd: typeof AdsSchema.DiaDiem.$inferSelect;
    };
  } = {};

  for (let i = 0; i < data.length; i++) {
    const qc = data[i];
    const prop: AdsGeoJson.AdsProperty = {
      ...qc.quang_cao,
      ...qc.dia_diem,
      loai_vitri: qc.loai_vitri,
      hinh_thuc: qc.hinh_thuc,
      bang_qc: qc.bang_qc,
    };
    const trimProp = AdsGeoJson.AdsPropertySchema.safeParse(prop);
    if (trimProp.success == false) continue;

    if (grp_by_location[qc.dia_diem.id_dia_diem]) {
      grp_by_location[qc.dia_diem.id_dia_diem].ads.push(trimProp.data);
    } else {
      grp_by_location[qc.dia_diem.id_dia_diem] = {
        ads: [trimProp.data],
        dd: qc.dia_diem,
      };
    }
  }

  return grp_by_location;
}

const GeoJsonRouter = Router();

GeoJsonRouter.get("/", async function (req, res) {
  const qc_data = await CallAndCatchAsync(GetQuangCaoData, undefined);
  if (qc_data.success == false)
    return res.status(500).json({ error: qc_data.error });

  const geo_json: AdsGeoJson.AdsGeoJson = {
    type: "FeatureCollection",
    crs: {
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      type: "name",
    },
    features: [],
  };

  const geo_data = Object.entries(qc_data.data);

  for (let i = 0; i < geo_data.length; i++) {
    const qc = geo_data[i];

    geo_json.features.push({
      type: "Feature",
      properties: {
        ads: qc[1].ads,
        place: qc[1].dd,
      },
      geometry: {
        type: "Point",
        coordinates: [qc[1].dd.lng, qc[1].dd.lat, 0],
      },
    });
  }

  return res.status(200).json(geo_json);
});

export default GeoJsonRouter;
