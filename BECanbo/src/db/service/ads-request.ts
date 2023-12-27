import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { QuangCao, YeuCauCapPhep, DiaDiem, LoaiBangQC, LoaiViTri, HinhThucQC, YeuCauChinhSua } from "@admanager/backend/db/schema";
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
    .from(YeuCauCapPhep)
    .innerJoin(
      DiaDiem,
      eq(DiaDiem.id_dia_diem, YeuCauCapPhep.id_diem_dat)
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
      chinh_sua: YeuCauChinhSua,
      thong_tin_qc: {
        ...QuangCao,
        quang_cao: QuangCao,
        loai_vitri: LoaiViTri.loai_vitri,
        hinh_thuc: HinhThucQC.hinh_thuc_qc,
        bang_qc: LoaiBangQC.loai_bang_qc,
      },
    })
    .from(YeuCauChinhSua)
    .innerJoin(
      QuangCao,
      eq(QuangCao.id_quang_cao, YeuCauChinhSua.id_quang_cao)
    )
    .innerJoin(
      LoaiViTri,
      eq(LoaiViTri.id_loai_vt, QuangCao.id_loai_vitri)
    )
    .innerJoin(
      HinhThucQC,
      eq(HinhThucQC.id_htqc, QuangCao.id_hinh_thuc)
    )
    .innerJoin(
      LoaiBangQC,
      eq(
        LoaiBangQC.id_loai_bang_qc,
        QuangCao.id_loai_bang_qc
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
