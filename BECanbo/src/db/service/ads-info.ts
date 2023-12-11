import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";

export const getAllAdsInfo = async () => {
  const data = await pg_client.select({
    ads: AdsSchema.QuangCao,
    place: AdsSchema.DiaDiem,
    placeType: AdsSchema.LoaiViTri,
    contentType: AdsSchema.HinhThucQC,
    adsType: AdsSchema.LoaiBangQC
  })
  .from(AdsSchema.QuangCao)
  .innerJoin(
    AdsSchema.DiaDiem,
    eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.QuangCao.id_dia_diem)
  ).innerJoin(
    AdsSchema.LoaiViTri,
    eq(AdsSchema.LoaiViTri.id_loai_vt, AdsSchema.QuangCao.id_loai_vitri)
  ).innerJoin(
    AdsSchema.HinhThucQC,
    eq(AdsSchema.HinhThucQC.id_htqc, AdsSchema.QuangCao.id_hinh_thuc)
  ).innerJoin(
    AdsSchema.LoaiBangQC,
    eq(AdsSchema.LoaiBangQC.id_loai_bang_qc, AdsSchema.QuangCao.id_loai_bang_qc)
  );

  return data;
};
