import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { YeuCauCapPhep } from "@admanager/backend/db/schema";
import { eq } from "drizzle-orm";
import { AdRequest } from "../../../../FECanbo/src/types";

export const getAllAdsRequests = async () => {
  const data = await pg_client
    .select({
      place: AdsSchema.DiaDiem,
      adsContent: YeuCauCapPhep.noi_dung_qc,
      companyName: YeuCauCapPhep.ten_cty,
      companyPhone: YeuCauCapPhep.dien_thoai_cty,
      effDate: YeuCauCapPhep.ngay_hieu_luc,
      expDate: YeuCauCapPhep.ngay_het_han
    })
    .from(AdsSchema.YeuCauCapPhep)
    .innerJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
    );

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

export const saveAdsRequest = async (
  requestData: SaveAdsRequestData
): Promise<AdRequest | null> => {
  try {
    const {
      panoContent,
      position,
      companyName,
      phoneNumber,
      address,
      startDate,
      endDate,
      email,
      status,
      image,
    } = requestData;

    const [insertedId] = await pg_client
      .insert({
        id_diem_dat: parseInt(position),
        noi_dung_qc: panoContent,
        ten_cty: companyName,
        dien_thoai_cty: phoneNumber,
        email_cty: email,
        dia_chi_cty: address,
        ngay_hieu_luc: startDate,
        ngay_het_han: endDate,
        trang_thai: status,
        hinh_anh: image,
      })
      .into(AdsSchema.YeuCauCapPhep)
      .returning("id_yeu_cau")
      .execute();

    if (!insertedId) {
      throw new Error("Failed to retrieve inserted ID");
    }

    const [insertedData] = await pg_client
      .select()
      .from(AdsSchema.YeuCauCapPhep)
      .innerJoin(
        AdsSchema.DiaDiem,
        eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.YeuCauCapPhep.id_diem_dat)
      )
      .where({ id_yeu_cau: insertedId })
      .execute();

    return insertedData || null;
  } catch (error) {
    console.error("Error saving ads request:", error);
    throw error;
  }
};