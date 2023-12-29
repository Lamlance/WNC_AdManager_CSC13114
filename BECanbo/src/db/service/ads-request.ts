import { pg_client } from "../db.js";
import { AdsSchema } from "@admanager/backend";
import { AdChangeApi, AdsReqApi } from "@admanager/shared";
import { eq } from "drizzle-orm";

export const getAllAdsRequests = async (): Promise<
  AdsReqApi.ManyAdsRequestResponse[]
> => {
  const data = await pg_client
    .select({
      yeu_cau: AdsSchema.YeuCauCapPhep,
      dia_diem: AdsSchema.DiaDiem,
    })
    .from(AdsSchema.YeuCauCapPhep)
    .leftJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
    );
  return data;
};

export async function createAdRequest(data: AdsReqApi.AdRequestCreate) {
  const res = await pg_client
    .insert(AdsSchema.YeuCauCapPhep)
    .values({ ...data, trang_thai: data.trang_thai || undefined })
    .returning({ insertedId: AdsSchema.YeuCauCapPhep.id_yeu_cau });
  return res[0].insertedId;
}

export async function getAllAdsChangeRequest(): Promise<
  AdChangeApi.AdChangeRequestResponse[]
> {
  const data = await pg_client
    .select({
      chinh_sua: AdsSchema.YeuCauChinhSua,
      thong_tin_qc: {
        ...AdsSchema.QuangCao,
        quang_cao: AdsSchema.QuangCao,
        loai_vitri: AdsSchema.LoaiViTri.loai_vitri,
        hinh_thuc: AdsSchema.HinhThucQC.hinh_thuc_qc,
        bang_qc: AdsSchema.LoaiBangQC.loai_bang_qc,
      },
    })
    .from(AdsSchema.YeuCauChinhSua)
    .innerJoin(
      AdsSchema.QuangCao,
      eq(AdsSchema.QuangCao.id_quang_cao, AdsSchema.YeuCauChinhSua.id_quang_cao)
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

  return data;
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
type UpdateAdStatusRequestArgs = { id_yeu_cau: number; trang_thai: string };
export async function updateAdStatusRequest(args: UpdateAdStatusRequestArgs) {
  const res = await pg_client
    .update(AdsSchema.YeuCauCapPhep)
    .set({ trang_thai: args.trang_thai })
    .where(eq(AdsSchema.YeuCauCapPhep.id_yeu_cau, args.id_yeu_cau));

  return res;
}
