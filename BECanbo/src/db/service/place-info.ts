import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { PlaceChangeApi } from "@admanager/shared";
import { eq, inArray } from "drizzle-orm";
type getAllPlaceChangeRequestArgs = { phuong_id?: number[] };
export async function getAllPlaceChangeRequest(
  args: getAllPlaceChangeRequestArgs
): Promise<PlaceChangeApi.PlaceChangeRequestResponse[]> {
  const res = pg_client.select().from(AdsSchema.YeuCauChinhSuaDiaDiem);
  if (args.phuong_id) {
    const data = await res
      .innerJoin(
        AdsSchema.DiaDiem,
        eq(
          AdsSchema.DiaDiem.id_dia_diem,
          AdsSchema.YeuCauChinhSuaDiaDiem.id_dia_diem
        )
      )
      .where(inArray(AdsSchema.DiaDiem.id_phuong, args.phuong_id));

    return data.map((v) => v.YeuCauChinhSuaDiaDiem);
  }
  return await res;
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
