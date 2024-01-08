import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";

export async function getAllAdsBoardType() {
  const data = await pg_client
    .select({ bang_qc: AdsSchema.LoaiBangQC })
    .from(AdsSchema.LoaiBangQC);
  return data;
}
