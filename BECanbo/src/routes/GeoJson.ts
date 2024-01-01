import { AdsSchema } from "@admanager/backend";
import { Router } from "express";
import { CallAndCatchAsync } from "../utils/CallCatch.js";
import { eq } from "drizzle-orm";
import { AdsGeoJson } from "@admanager/shared";
import { pg_client } from "../db/db.js";
import z from "zod";
import { GetQuangManyCaoData } from "../db/service/ads-info.js";
import { ValidatorMwBuilder } from "../utils/ValidationMiddlewareBuilder.js";
import { PhuongIdArrayScheama } from "../utils/PhuongIdArray.js";

async function GetReportData() {
  const data = await pg_client
    .select({
      bao_cao: AdsSchema.BaoCao,
      loai_bao_cao: AdsSchema.LoaiBaoCao.loai_bao_cao,
      dia_diem: AdsSchema.DiaDiem,
      quang_cao: AdsSchema.QuangCao,
    })
    .from(AdsSchema.BaoCao)
    .innerJoin(
      AdsSchema.LoaiBaoCao,
      eq(AdsSchema.BaoCao.id_bao_cao, AdsSchema.LoaiBaoCao.id_loai_bc)
    )
    .leftJoin(
      AdsSchema.QuangCao,
      eq(AdsSchema.BaoCao.id_quang_cao, AdsSchema.QuangCao.id_quang_cao)
    )
    .leftJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.QuangCao.id_dia_diem)
    );

  const grp_by_location: {
    [key: string]: AdsGeoJson.ReportGeoJsonProperty[];
  } = {};

  for (let i = 0; i < data.length; i++) {
    const rp: AdsGeoJson.ReportGeoJsonProperty = data[i];
    const trim_rp = AdsGeoJson.ReportGeoJsonPropertySchema.safeParse(rp);
    if (trim_rp.success == false) continue;
    const key = `${trim_rp.data.bao_cao.lng.toFixed(
      4
    )}|${trim_rp.data.bao_cao.lat.toFixed(4)}`;

    if (grp_by_location[key]) {
      grp_by_location[key].push(trim_rp.data);
    } else {
      grp_by_location[key] = [trim_rp.data];
    }
  }

  return grp_by_location;
}

const GeoJsonRouter = Router();

GeoJsonRouter.get(
  "/",
  ValidatorMwBuilder(
    z.object({
      phuong_id: PhuongIdArrayScheama.nullish(),
    }),
    undefined,
    async function (req, res) {
      const qc_data = await CallAndCatchAsync(GetQuangManyCaoData, {
        phuong_id: res.locals.query.phuong_id || undefined,
      });
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
        const prop: AdsGeoJson.AdsGeoJsonProperty = {
          ads: qc[1].ads,
          place: qc[1].dd,
        };
        geo_json.features.push({
          type: "Feature",
          properties: prop,
          geometry: {
            type: "Point",
            coordinates: [qc[1].dd.lng, qc[1].dd.lat, 0],
          },
        });
      }

      return res.status(200).json(geo_json);
    }
  )
);

GeoJsonRouter.get("/report", async function (req, res) {
  const rp_data = await CallAndCatchAsync(GetReportData, undefined);
  if (rp_data.success == false)
    return res.status(500).json({ error: rp_data.error });
  const geo_json: AdsGeoJson.ReportGeoJson = {
    type: "FeatureCollection",
    crs: {
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      type: "name",
    },
    features: [],
  };

  const geo_data = Object.entries(rp_data.data);
  for (let i = 0; i < geo_data.length; i++) {
    const rp = geo_data[i][1];
    const loc = geo_data[i][0];
    const [lngStr, latStr] = loc.split("|");
    const coord = z.array(z.coerce.number()).safeParse([lngStr, latStr]);
    if (coord.success == false) {
      console.log(coord.error);
      continue;
    }

    geo_json.features.push({
      type: "Feature",
      properties: rp,
      geometry: {
        type: "Point",
        coordinates: [coord.data[0], coord.data[1], 0],
      },
    });
  }

  return res.status(200).json(geo_json);
});

export default GeoJsonRouter;
