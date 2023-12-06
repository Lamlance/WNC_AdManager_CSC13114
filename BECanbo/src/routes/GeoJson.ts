import { AdsSchema, dbConn } from "@admanager/backend";
import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch.js";
import { eq } from "drizzle-orm";

type GeoJsonFeature = {
  type: "Feature";
  properties: {
    name: string;
    address: string;
    land_type: string;
    ad_type: string;
    legal: boolean;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number, 0];
  };
};

type GeoJson = {
  type: "FeatureCollection";
  crs: {
    type: "name";
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" };
  };
  features: GeoJsonFeature[];
};

async function GetQuangCaoData() {
  return await dbConn
    .select({
      dia_diem: AdsSchema.DiaDiem,
      quang_cao: AdsSchema.QuangCao,
      loai_vitri: AdsSchema.LoaiViTri.loai_vitri,
      hinh_thuc: AdsSchema.HinhThucQC.hinh_thuc_qc,
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
    );

  // return await dbConn.query.QuangCao.findMany({
  //   with: {
  //     dia_diem: {
  //       columns: { id_dia_diem: false, id_phuong: false, id_quan: false },
  //     },
  //     loai_vt: { columns: { id_loai_vt: false } },
  //     hinh_thuc: { columns: { id_htqc: false } },
  //   },
  //   columns: {
  //     id_dia_diem: false,
  //     id_hinh_thuc: false,
  //     id_loai_vitri: false,
  //   },
  // });
}

const GeoJsonRouter = Router();

GeoJsonRouter.get("/", async function (req, res) {
  const qc_data = await CallAndCatchAsync(GetQuangCaoData, undefined);
  if (qc_data.success == false)
    return res.status(500).json({ error: qc_data.error });

  const geo_json: GeoJson = {
    type: "FeatureCollection",
    crs: {
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      type: "name",
    },
    features: [],
  };

  for (let i = 0; i < qc_data.data.length; i++) {
    const qc = qc_data.data[i];
    const ft = geo_json.features.push({
      type: "Feature",
      properties: {
        name: qc.dia_diem.ten_dia_diem,
        address: qc.dia_diem.dia_chi,
        land_type: qc.loai_vitri,
        ad_type: qc.hinh_thuc,
        legal: qc.quang_cao.quy_hoach,
      },
      geometry: {
        type: "Point",
        coordinates: [qc.dia_diem.lng, qc.dia_diem.lat, 0],
      },
    });
  }

  return res.status(200).json(geo_json);
});

export default GeoJsonRouter;
