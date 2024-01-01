import {
  QuangCao,
  HinhThucQC,
  LoaiBangQC,
  LoaiViTri,
  DiaDiem,
} from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";
import { AdsGeoJson } from "@admanager/shared";
import { AdsSchema } from "@admanager/backend";

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
      dia_diem: DiaDiem,
      quang_cao: QuangCao,
      loai_vitri: LoaiViTri.loai_vitri,
      hinh_thuc: HinhThucQC.hinh_thuc_qc,
      bang_qc: LoaiBangQC.loai_bang_qc,
    })
    .from(QuangCao)
    .innerJoin(DiaDiem, eq(QuangCao.id_dia_diem, DiaDiem.id_dia_diem))
    .innerJoin(LoaiViTri, eq(LoaiViTri.id_loai_vt, QuangCao.id_loai_vitri))
    .innerJoin(HinhThucQC, eq(HinhThucQC.id_htqc, QuangCao.id_hinh_thuc))
    .innerJoin(
      LoaiBangQC,
      eq(LoaiBangQC.id_loai_bang_qc, QuangCao.id_loai_bang_qc)
    );

  const grp_by_location: {
    [key: number]: {
      ads: AdsGeoJson.AdsProperty[];
      dd: AdsGeoJson.PlaceProperty;
    };
  } = {};

  for (let i = 0; i < data.length; i++) {
    const qc = data[i];
    const prop: AdsGeoJson.AdsProperty = {
      ...qc.quang_cao,
      loai_vitri: qc.loai_vitri,
      hinh_thuc: qc.hinh_thuc,
      bang_qc: qc.bang_qc,
      ten_dia_diem: qc.dia_diem.ten_dia_diem,
      dia_chi: qc.dia_diem.dia_chi,
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

export async function UpdateQuangManyCaoData(data: AdsGeoJson.AdsProperty) {
  const { id_quang_cao } = data;
  const idLoaiBangQuangCao = await pg_client
    .select({ id_loai_bang_quang_cao: LoaiBangQC.id_loai_bang_qc })
    .from(AdsSchema.LoaiBangQC)
    .where(eq(LoaiBangQC.loai_bang_qc, data.bang_qc))
    .then((result) => result && result[0] && result[0].id_loai_bang_quang_cao);
  const idHinhThucQC = await pg_client
    .select({ id_ht_qc: HinhThucQC.id_htqc })
    .from(HinhThucQC)
    .where(eq(HinhThucQC.hinh_thuc_qc, data.hinh_thuc))
    .then((result) => result && result[0] && result[0].id_ht_qc);

  const idLoaiViTri = await pg_client
    .select({ id_loai_vi_tri: LoaiViTri.id_loai_vt })
    .from(LoaiViTri)
    .where(eq(LoaiViTri.loai_vitri, data.loai_vitri))
    .then((result) => result && result[0] && result[0].id_loai_vi_tri);

  const idDiaDiem = await pg_client
    .select({ id_dia_diem: DiaDiem.id_dia_diem })
    .from(DiaDiem)
    .where(eq(DiaDiem.dia_chi, data.dia_chi as string))
    .then((result) => result && result[0] && result[0].id_dia_diem);

  const res = await pg_client
    .update(QuangCao)
    .set({
      ngay_hieu_luc: data.ngay_hieu_luc,
      ngay_het_han: data.ngay_het_han,
      hinh_1: data.hinh_1,
      hinh_2: data.hinh_2,
      so_luong: data.so_luong,
      chieu_dai_m: data.chieu_dai_m,
      chieu_rong_m: data.chieu_rong_m,
      id_loai_bang_qc: idLoaiBangQuangCao,
      id_dia_diem: idDiaDiem,
      id_hinh_thuc: idHinhThucQC,
      id_loai_vitri: idLoaiViTri,
    })
    .where(eq(QuangCao.id_quang_cao, id_quang_cao));

  return res;
}

export async function CreateQuangManyCaoData(
  data: AdsGeoJson.AdsCreateProPerty
) {
  const idLoaiBangQuangCao = await pg_client
    .select({ id_loai_bang_quang_cao: LoaiBangQC.id_loai_bang_qc })
    .from(AdsSchema.LoaiBangQC)
    .where(eq(LoaiBangQC.loai_bang_qc, data.bang_qc))
    .then((result) => result && result[0] && result[0].id_loai_bang_quang_cao);
  const idHinhThucQC = await pg_client
    .select({ id_ht_qc: HinhThucQC.id_htqc })
    .from(HinhThucQC)
    .where(eq(HinhThucQC.hinh_thuc_qc, data.hinh_thuc))
    .then((result) => result && result[0] && result[0].id_ht_qc);

  const idLoaiViTri = await pg_client
    .select({ id_loai_vi_tri: LoaiViTri.id_loai_vt })
    .from(LoaiViTri)
    .where(eq(LoaiViTri.loai_vitri, data.loai_vitri))
    .then((result) => result && result[0] && result[0].id_loai_vi_tri);

  const idDiaDiem = await pg_client
    .select({ id_dia_diem: DiaDiem.id_dia_diem })
    .from(DiaDiem)
    .where(eq(DiaDiem.dia_chi, data.dia_chi as string))
    .then((result) => result && result[0] && result[0].id_dia_diem);

  const res = await pg_client
    .insert(AdsSchema.QuangCao)
    .values({
      ngay_hieu_luc: data.ngay_hieu_luc,
      ngay_het_han: data.ngay_het_han,
      hinh_1: data.hinh_1,
      hinh_2: data.hinh_2,
      so_luong: data.so_luong,
      chieu_dai_m: data.chieu_dai_m,
      chieu_rong_m: data.chieu_rong_m,
      id_loai_bang_qc: idLoaiBangQuangCao,
      id_dia_diem: idDiaDiem,
      id_hinh_thuc: idHinhThucQC,
      id_loai_vitri: idLoaiViTri,
      quy_hoach: false,
    })
    .returning({ insertedId: AdsSchema.QuangCao.id_quang_cao });

  return res;
}
