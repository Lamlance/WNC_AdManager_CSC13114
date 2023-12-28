import { HinhThucQC } from "@admanager/backend/db/schema";
import { pg_client } from "../db";

export const getAllAdsMethod = async () => {
  const data = await pg_client
    .select({
      id_htqc: HinhThucQC.id_htqc,
      hinh_thuc_qc: HinhThucQC.hinh_thuc_qc,
    })
    .from(HinhThucQC);

  return data;
};
