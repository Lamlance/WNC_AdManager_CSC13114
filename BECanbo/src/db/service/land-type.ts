import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";

export async function getAllLandType() {
  const data = await pg_client
    .select({ vi_tri: AdsSchema.LoaiViTri })
    .from(AdsSchema.LoaiViTri);
  return data;
}
