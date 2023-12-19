import { QuangCao, HinhThucQC, LoaiBangQC, LoaiViTri, DiaDiem } from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";

export const getAllAdsInfo = async () => {
  const data = await pg_client.select({
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
  .innerJoin(
    DiaDiem,
    eq(DiaDiem.id_dia_diem, QuangCao.id_dia_diem)
  ).innerJoin(
    LoaiViTri,
    eq(LoaiViTri.id_loai_vt, QuangCao.id_loai_vitri)
  ).innerJoin(
    HinhThucQC,
    eq(HinhThucQC.id_htqc, QuangCao.id_hinh_thuc)
  ).innerJoin(
    LoaiBangQC,
    eq(LoaiBangQC.id_loai_bang_qc, QuangCao.id_loai_bang_qc)
  );

  return data;
};
