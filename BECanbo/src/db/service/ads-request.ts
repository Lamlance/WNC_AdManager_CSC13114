import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { YeuCauCapPhep } from "@admanager/backend/db/schema";
import { eq } from "drizzle-orm";

export const getAllAdsRequests = async () => {
  const data = await pg_client
    .select({
      place: AdsSchema.DiaDiem,
      idYeucau: YeuCauCapPhep.id_yeu_cau,
      adsContent: YeuCauCapPhep.noi_dung_qc,
      companyName: YeuCauCapPhep.ten_cty,
      companyPhone: YeuCauCapPhep.dien_thoai_cty,
      effDate: YeuCauCapPhep.ngay_hieu_luc,
      expDate: YeuCauCapPhep.ngay_het_han,
    })
    .from(AdsSchema.YeuCauCapPhep)
    .innerJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
    );

  return data;
};
