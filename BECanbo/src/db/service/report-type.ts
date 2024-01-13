import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";

export async function getAllReportType() {
  const data = await pg_client
    .select({
      loai_bc: AdsSchema.LoaiBaoCao,
    })
    .from(AdsSchema.LoaiBaoCao);
  return data;
}
