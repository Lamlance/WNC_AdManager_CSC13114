import { HinhThucQC } from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { AdsGeoJson } from "@admanager/shared";
import { AdsSchema } from "@admanager/backend";
import { eq } from "drizzle-orm";
export const getAllAdsMethod = async () => {
  const data = await pg_client
    .select({
      id_htqc: HinhThucQC.id_htqc,
      hinh_thuc_qc: HinhThucQC.hinh_thuc_qc,
    })
    .from(HinhThucQC);

  return data;
};

export async function createAdMethod(data: AdsGeoJson.AdMethodCreateProperty) {
  const res = await pg_client
    .insert(AdsSchema.HinhThucQC)
    .values({ ...data })
    .returning({ insertedId: AdsSchema.HinhThucQC.id_htqc });

  return res[0].insertedId;
}

export async function updateAdMethod(data: AdsGeoJson.AdMethodProperty) {
  const { id_htqc, hinh_thuc_qc } = data;

  const res = await pg_client
    .update(AdsSchema.HinhThucQC)
    .set({ hinh_thuc_qc: hinh_thuc_qc })
    .where(eq(AdsSchema.HinhThucQC.id_htqc, id_htqc));

  return res;
}
export async function deleteAdMethod(data: AdsGeoJson.AdMethodDeleteProperty) {
  const { id_htqc } = data;

  const res = await pg_client
    .delete(AdsSchema.HinhThucQC)
    .where(eq(AdsSchema.HinhThucQC.id_htqc, id_htqc));

  return res;
}
