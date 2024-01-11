import {
  QuangCao,
  HinhThucQC,
  LoaiBangQC,
  LoaiViTri,
  DiaDiem,
} from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { eq, inArray } from "drizzle-orm";
import { AdChangeApi, AdsGeoJson } from "@admanager/shared";
import { AdsSchema } from "@admanager/backend";

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

export async function UpdateAdsData(
  args: AdChangeApi.AdChangeData & { id_quang_cao: string }
) {
  await pg_client
    .update(AdsSchema.QuangCao)
    .set({
      ...args,
      id_quang_cao: undefined,
      id_loai_bang_qc: args.id_loai_bang_qc || undefined,
      id_dia_diem: undefined,
      id_hinh_thuc: args.id_hinh_thuc || undefined,
      id_loai_vitri: args.id_loai_vitri || undefined,
      ngay_het_han: args.ngay_het_han ? new Date(args.ngay_het_han) : undefined,
      ngay_hieu_luc: args.ngay_hieu_luc
        ? new Date(args.ngay_hieu_luc)
        : undefined,
    })
    .where(eq(AdsSchema.QuangCao.id_quang_cao, args.id_quang_cao));
}

export async function CreateAds(args: AdChangeApi.AdCreateBody) {
  await pg_client.insert(AdsSchema.QuangCao).values(args);
}
