import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { DiaDiem, YeuCauCapPhep } from "@admanager/backend/db/schema";
import { eq } from "drizzle-orm";

export const getAllAdsRequests = async () => {
  const data = await pg_client
    .select({
      id: YeuCauCapPhep.id_yeu_cau,
      place: DiaDiem.dia_chi,
      adsContent: YeuCauCapPhep.noi_dung_qc,
      companyEmail: YeuCauCapPhep.email_cty,
      companyName: YeuCauCapPhep.ten_cty,
      companyPhone: YeuCauCapPhep.dien_thoai_cty,
      effDate: YeuCauCapPhep.ngay_hieu_luc,
      expDate: YeuCauCapPhep.ngay_het_han
    })
    .from(YeuCauCapPhep)
    .innerJoin(
      DiaDiem,
      eq(DiaDiem.id_dia_diem, YeuCauCapPhep.id_diem_dat)
    );

    return data;
};
