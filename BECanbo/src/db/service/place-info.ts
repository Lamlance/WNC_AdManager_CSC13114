import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { PlaceChangeApi, PlaceApi } from "@admanager/shared";
import { eq } from "drizzle-orm";

// request edit plae
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


// action for place 
export async function getAllPlace(data: number) {
  return pg_client.select().from(AdsSchema.DiaDiem)
  .where(eq(AdsSchema.DiaDiem.id_phuong, data));
}
export async function getAllPlaces() {
  return pg_client.select().from(AdsSchema.DiaDiem);
}

export async function createPlace(data: PlaceApi.PlaceProperty) {
  const { id_dia_diem, ...body } = data;
  console.log(id_dia_diem)
  const res = await pg_client
    .insert(AdsSchema.DiaDiem)
    .values(body)
    .returning({ insertedId: AdsSchema.DiaDiem.id_dia_diem });
  return res[0].insertedId;
}

export async function updatePlace(data: PlaceApi.PlaceProperty) {
  const { id_dia_diem, id_ban_do, ...body } = data;
  const res = await pg_client
    .update(AdsSchema.DiaDiem)
    .set({ place_id: id_ban_do, ...body })
    .where(eq(AdsSchema.DiaDiem.id_dia_diem, id_dia_diem));
  console.log("res,", res)
  return res;
}
export async function deletePlace(data: PlaceApi.PlaceProperty) {
  const res = await pg_client
    .delete(AdsSchema.DiaDiem)
    .where(eq(AdsSchema.DiaDiem.id_dia_diem, data.id_dia_diem));
  return res;
}
