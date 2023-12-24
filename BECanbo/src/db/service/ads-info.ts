import {
  QuangCao,
  HinhThucQC,
  LoaiBangQC,
  LoaiViTri,
  DiaDiem,
} from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";
import { AdsSchema } from "@admanager/backend";
import { AdsGeoJson } from "@admanager/shared";

export const getAllAdsInfo = async () => {
  const data = await pg_client
    .select({
      id: QuangCao.id_quang_cao,
      effDate: QuangCao.ngay_hieu_luc,
      expDate: QuangCao.ngay_het_han,
      length: QuangCao.chieu_dai_m,
      width: QuangCao.chieu_rong_m,
      number: QuangCao.so_luong,
      imageUrl1: QuangCao.hinh_1,
      imageUrl2: QuangCao.hinh_2,
      adsType: LoaiBangQC.loai_bang_qc,
      placeType: LoaiViTri.loai_vitri,
      contentType: HinhThucQC.hinh_thuc_qc,
      address: DiaDiem.dia_chi,
    })
    .from(QuangCao)
    .innerJoin(DiaDiem, eq(DiaDiem.id_dia_diem, QuangCao.id_dia_diem))
    .innerJoin(LoaiViTri, eq(LoaiViTri.id_loai_vt, QuangCao.id_loai_vitri))
    .innerJoin(HinhThucQC, eq(HinhThucQC.id_htqc, QuangCao.id_hinh_thuc))
    .innerJoin(
      LoaiBangQC,
      eq(LoaiBangQC.id_loai_bang_qc, QuangCao.id_loai_bang_qc)
    );

  return data;
};

export async function GetQuangManyCaoData() {
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
