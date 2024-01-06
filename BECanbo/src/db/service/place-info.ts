import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { PlaceChangeApi } from "@admanager/shared";
import { eq, inArray, sql } from "drizzle-orm";
type getAllPlaceChangeRequestArgs = { phuong_id?: number[] };
export async function getAllPlaceChangeRequest(
  args: getAllPlaceChangeRequestArgs
): Promise<PlaceChangeApi.PlaceChangeRequestResponse[]> {
  const res = pg_client
    .select({
      id_yeu_cau: AdsSchema.YeuCauChinhSuaDiaDiem.id_yeu_cau,
      id_dia_diem: AdsSchema.YeuCauChinhSuaDiaDiem.id_dia_diem,
      lng: AdsSchema.DiaDiem.lng,
      lat: AdsSchema.DiaDiem.lat,
      ten_dia_diem: AdsSchema.DiaDiem.ten_dia_diem,
      dia_chi: AdsSchema.DiaDiem.dia_chi,
      ly_do_chinh_sua: AdsSchema.YeuCauChinhSuaDiaDiem.ly_do_chinh_sua,
    })
    .from(AdsSchema.YeuCauChinhSuaDiaDiem)
    .innerJoin(
      AdsSchema.DiaDiem,
      eq(
        AdsSchema.DiaDiem.id_dia_diem,
        AdsSchema.YeuCauChinhSuaDiaDiem.id_dia_diem
      )
    );
  if (args.phuong_id) {
    const data = await res.where(
      inArray(AdsSchema.DiaDiem.id_phuong, args.phuong_id)
    );

    return data;
  }

  const data: PlaceChangeApi.PlaceChangeRequestResponse[] = await res;
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
