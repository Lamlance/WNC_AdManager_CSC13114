import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import {
  QuangCao,
  YeuCauCapPhep,
  DiaDiem,
  LoaiBangQC,
  LoaiViTri,
  HinhThucQC,
  YeuCauChinhSua,
} from "@admanager/backend/db/schema";
import { AdChangeApi, AdsReqApi } from "@admanager/shared";
import { SQL, eq, ilike, inArray, or } from "drizzle-orm";
import { VNCharToEN } from "../../utils/VNCharToEN";

type getAllAdsRequestsArgs = { phuong_id?: number[] };
export const getAllAdsRequests = async (
  args: getAllAdsRequestsArgs
): Promise<AdsReqApi.ManyAdsRequestResponse[]> => {
  const ward_list =
    args.phuong_id &&
    (await pg_client
      .select()
      .from(AdsSchema.Phuong)
      .where(inArray(AdsSchema.Phuong.id_phuong, args.phuong_id)));

  const data = pg_client
    .select({
      yeu_cau: AdsSchema.YeuCauCapPhep,
      dia_diem: AdsSchema.DiaDiem,
    })
    .from(YeuCauCapPhep)
    .leftJoin(DiaDiem, eq(DiaDiem.id_dia_diem, YeuCauCapPhep.id_diem_dat));

  if (ward_list) {
    const q = ward_list.reduce((acum, curr) => {
      acum.push(
        ilike(AdsSchema.YeuCauCapPhep.dia_chi_qc, `%${curr.ten_phuong}%`)
      );
      acum.push(
        ilike(
          AdsSchema.YeuCauCapPhep.dia_chi_qc,
          `%${VNCharToEN(curr.ten_phuong)}%`
        )
      );
      return acum;
    }, [] as SQL[]);
    data.where(or(...q));
  }
  return await data;
};

export async function createAdRequest(data: AdsReqApi.AdRequestCreate) {
  const res = await pg_client
    .insert(AdsSchema.YeuCauCapPhep)
    .values({ ...data, trang_thai: data.trang_thai || undefined })
    .returning({ insertedId: AdsSchema.YeuCauCapPhep.id_yeu_cau });
  return res[0].insertedId;
}

type getAllAdsChangeRequestArgs = { phuong_id?: number[] };
export async function getAllAdsChangeRequest(
  args: getAllAdsChangeRequestArgs
): Promise<AdChangeApi.AdChangeRequestResponse[]> {
  const data = pg_client
    .select({
      chinh_sua: YeuCauChinhSua,
      thong_tin_qc: {
        ...QuangCao,
        quang_cao: QuangCao,
        loai_vitri: LoaiViTri.loai_vitri,
        hinh_thuc: HinhThucQC.hinh_thuc_qc,
        bang_qc: LoaiBangQC.loai_bang_qc,
      },
      dia_diem: AdsSchema.DiaDiem,
    })
    .from(YeuCauChinhSua)
    .innerJoin(QuangCao, eq(QuangCao.id_quang_cao, YeuCauChinhSua.id_quang_cao))
    .innerJoin(DiaDiem, eq(DiaDiem.id_dia_diem, QuangCao.id_dia_diem))
    .innerJoin(LoaiViTri, eq(LoaiViTri.id_loai_vt, QuangCao.id_loai_vitri))
    .innerJoin(HinhThucQC, eq(HinhThucQC.id_htqc, QuangCao.id_hinh_thuc))
    .innerJoin(
      LoaiBangQC,
      eq(LoaiBangQC.id_loai_bang_qc, QuangCao.id_loai_bang_qc)
    );

  if (args.phuong_id) {
    const result = await data.where(
      inArray(AdsSchema.DiaDiem.id_phuong, args.phuong_id)
    );
    return result;
  }

  return await data;
}

export async function createAdChangeRequest(
  data: AdChangeApi.AdChangeRequestCreate
) {
  const res = await pg_client
    .insert(AdsSchema.YeuCauChinhSua)
    .values({ ...data, trang_thai: "Chờ" })
    .returning({ insertId: AdsSchema.YeuCauChinhSua.id_yeu_cau });
  return res[0].insertId;
}

export async function updateAdChangeStatusRequest(
  args: AdChangeApi.AdChangeStatusRequestUpdate
) {
  const res = await pg_client
    .update(AdsSchema.YeuCauChinhSua)
    .set({ trang_thai: args.trang_thai })
    .where(eq(AdsSchema.YeuCauChinhSua.id_yeu_cau, args.id_yeu_cau))
    .returning({
      yeu_cau: AdsSchema.YeuCauChinhSua,
    });

  const data = AdChangeApi.AdChangeRequestSchema.safeParse(res[0]?.yeu_cau);
  if (args.trang_thai === "Đã duyệt" && data.success === true) {
    console.log(data.data);
    await pg_client
      .update(AdsSchema.QuangCao)
      .set({
        ...data.data.thong_tin_sua,
        ngay_het_han: data.data.thong_tin_sua.ngay_het_han
          ? new Date(data.data.thong_tin_sua.ngay_het_han)
          : undefined,
        ngay_hieu_luc: data.data.thong_tin_sua.ngay_hieu_luc
          ? new Date(data.data.thong_tin_sua.ngay_hieu_luc)
          : undefined,
        id_loai_bang_qc: data.data.thong_tin_sua.id_loai_bang_qc || undefined,
        id_dia_diem: data.data.thong_tin_sua.id_dia_diem || undefined,
        id_hinh_thuc: data.data.thong_tin_sua.id_hinh_thuc || undefined,
        id_loai_vitri: data.data.thong_tin_sua.id_loai_vitri || undefined,
      })
      .where(eq(AdsSchema.QuangCao.id_quang_cao, res[0].yeu_cau.id_quang_cao));
  } else {
    data.success == false ? console.log(data.error) : "";
  }
  return res[0];
}

type UpdateAdStatusRequestArgs = { id_yeu_cau: number; trang_thai: string };
export async function updateAdStatusRequest(args: UpdateAdStatusRequestArgs) {
  const res = await pg_client
    .update(AdsSchema.YeuCauCapPhep)
    .set({ trang_thai: args.trang_thai })
    .where(eq(AdsSchema.YeuCauCapPhep.id_yeu_cau, args.id_yeu_cau));

  return res;
}
