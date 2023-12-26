import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { PlaceChangeApi } from "@admanager/shared";

export async function getAllPlaceChangeRequest() {
  const res: PlaceChangeApi.PlaceChangeRequestResponse[] = await pg_client
    .select()
    .from(AdsSchema.YeuCauChinhSuaDiaDiem);
  return res;
}

export async function createPlaceChangeRequest(
  data: PlaceChangeApi.PlaceChangeRequestCreate
) {
  const res = await pg_client
    .insert(AdsSchema.YeuCauChinhSuaDiaDiem)
    .values(data)
    .returning({ insertedId: AdsSchema.YeuCauChinhSuaDiaDiem.id_yeu_cau });
  return res[0].insertedId;
}
