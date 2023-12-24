import { pg_client } from "../db.js";
import { AdsSchema } from "@admanager/backend";
import { AdsReqApi } from "@admanager/shared";
import { eq } from "drizzle-orm";

export const getAllAdsRequests = async (): Promise<
  AdsReqApi.ManyAdsRequestResponse[]
> => {
  const data = await pg_client
    .select({
      place: AdsSchema.DiaDiem,
      idYeucau: AdsSchema.YeuCauCapPhep.id_yeu_cau,
      adsContent: AdsSchema.YeuCauCapPhep.noi_dung_qc,
      companyEmail: AdsSchema.YeuCauCapPhep.email_cty,
      companyName: AdsSchema.YeuCauCapPhep.ten_cty,
      companyPhone: AdsSchema.YeuCauCapPhep.dien_thoai_cty,
      effDate: AdsSchema.YeuCauCapPhep.ngay_hieu_luc,
      expDate: AdsSchema.YeuCauCapPhep.ngay_het_han,
    })
    .from(AdsSchema.YeuCauCapPhep)
    .innerJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
    );

  return data;
  return data;
};

interface SaveAdsRequestData {
  panoContent: string;
  position: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  startDate: Date;
  endDate: Date;
  additionalInfo: string;
  status: string;
  image: string;
}

// export const saveAdsRequest = async (
//   requestData: SaveAdsRequestData
// ): Promise<AdRequest | null> => {
//   try {
//     const {
//       panoContent,
//       position,
//       companyName,
//       phoneNumber,
//       address,
//       startDate,
//       endDate,
//       email,
//       status,
//       image,
//     } = requestData;

//     const [insertedId] = await pg_client
//       .insert(AdsSchema.YeuCauCapPhep)
//       .values({
//         ten_cty: companyName,
//         dien_thoai_cty: phoneNumber,
//         email_cty: email,
//         dia_chi_cty: address,
//         ngay_hieu_luc: startDate,
//         ngay_het_han: endDate,
//         trang_thai: "macdin",
//         hinh_anh: image,
//       })
//       .returning({ insertedId: AdsSchema.YeuCauCapPhep.id_yeu_cau })
//       .execute();

//     if (!insertedId) {
//       throw new Error("Failed to retrieve inserted ID");
//     }

//     const [insertedData] = await pg_client
//       .select()
//       .from(AdsSchema.YeuCauCapPhep)
//       .innerJoin(
//         AdsSchema.DiaDiem,
//         eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
//       )
//       .where({ id_yeu_cau: insertedId })
//       .execute();

//     return insertedData || null;
//   } catch (error) {
//     console.error("Error saving ads request:", error);
//     throw error;
//   }
// };
//a
