import {
  QuangCao,
  HinhThucQC,
  LoaiBangQC,
  LoaiViTri,
  DiaDiem,
} from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { eq, inArray } from "drizzle-orm";
import { AdsGeoJson } from "@admanager/shared";

type GetQuangManyCaoDataArgs = { phuong_id?: number[] };
export async function GetQuangManyCaoData(args: GetQuangManyCaoDataArgs) {
  const query = pg_client
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
  if (args?.phuong_id) {
    query.where(inArray(DiaDiem.id_phuong, args.phuong_id));
  }

  const data = await query;
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
