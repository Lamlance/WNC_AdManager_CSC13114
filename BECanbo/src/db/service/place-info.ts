import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { PlaceApi, PlaceChangeApi } from "@admanager/shared";
import { eq, inArray, sql } from "drizzle-orm";
type getAllPlaceChangeRequestArgs = { phuong_id?: number[] };

export async function getAllPlace() {
  const data: PlaceApi.GetAllPlaceResponse[] = await pg_client
    .select({ place: AdsSchema.DiaDiem })
    .from(AdsSchema.DiaDiem);
  return data;
}

export async function createPlaceInfo(data: PlaceApi.CreatePlaceBody) {
  const res = await pg_client.insert(AdsSchema.DiaDiem).values(data).returning({
    id_dia_diem: AdsSchema.DiaDiem.id_dia_diem,
  });
  return res[0] || null;
}

export async function updatePlaceInfo(data: PlaceApi.UpdatePlaceBody) {
  const res = await pg_client
    .update(AdsSchema.DiaDiem)
    .set({ ...data, id_dia_diem: undefined })
    .where(eq(AdsSchema.DiaDiem.id_dia_diem, data.id_dia_diem))
    .returning({
      id_dia_diem: AdsSchema.DiaDiem.id_dia_diem,
    });
  return res[0] || null;
}

export async function getAllPlaceChangeRequest(
  args: getAllPlaceChangeRequestArgs
): Promise<PlaceChangeApi.PlaceChangeRequestResponse[]> {
  const res = pg_client
    .select({
      id_yeu_cau: AdsSchema.YeuCauChinhSuaDiaDiem.id_yeu_cau,
      id_dia_diem: AdsSchema.YeuCauChinhSuaDiaDiem.id_dia_diem,
      lng: AdsSchema.YeuCauChinhSuaDiaDiem.lng,
      lat: AdsSchema.YeuCauChinhSuaDiaDiem.lat,
      ten_dia_diem: AdsSchema.YeuCauChinhSuaDiaDiem.ten_dia_diem,
      dia_chi: AdsSchema.YeuCauChinhSuaDiaDiem.dia_chi,
      ly_do_chinh_sua: AdsSchema.YeuCauChinhSuaDiaDiem.ly_do_chinh_sua,
      trang_thai: AdsSchema.YeuCauChinhSuaDiaDiem.trang_thai,
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

export async function updatePlaceChangeRequest(
  args: PlaceChangeApi.PlaceChangeRequestResponse
) {
  await pg_client
    .update(AdsSchema.YeuCauChinhSuaDiaDiem)
    .set({
      ...args,
      id_yeu_cau: undefined,
    })
    .where(eq(AdsSchema.YeuCauChinhSuaDiaDiem.id_yeu_cau, args.id_yeu_cau));
  if (args.trang_thai === "Đã duyệt" && args.id_dia_diem) {
    await pg_client
      .update(AdsSchema.DiaDiem)
      .set({
        ten_dia_diem: args.ten_dia_diem || undefined,
        dia_chi: args.dia_chi || undefined,
        lng: args.lng || undefined,
        lat: args.lat || undefined,
      })
      .where(eq(AdsSchema.DiaDiem.id_dia_diem, args.id_dia_diem));
  }
}
