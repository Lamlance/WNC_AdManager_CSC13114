import { HinhThucQC } from "@admanager/backend/db/schema";
import { pg_client } from "../db";

export const getAllAdsMethod = async () => {
  const data = await pg_client
    .select({
      id: HinhThucQC.id_htqc,
      adMethod: HinhThucQC.hinh_thuc_qc,
    })
    .from(HinhThucQC);

  return data;
};
