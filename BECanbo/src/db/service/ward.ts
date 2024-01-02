import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq, inArray } from "drizzle-orm";

type GetAllWardArgs = {
  id_quan?: number[];
};

export async function GetAllWard({ id_quan }: GetAllWardArgs) {
  const getPhuong = pg_client
    .select({
      phuong: AdsSchema.Phuong,
      quan: AdsSchema.Quan,
    })
    .from(AdsSchema.Phuong)
    .innerJoin(
      AdsSchema.Quan,
      eq(AdsSchema.Phuong.id_quan, AdsSchema.Quan.id_quan)
    );
  if (id_quan) {
    return await getPhuong.where(inArray(AdsSchema.Phuong.id_quan, id_quan));
  }
  return await getPhuong;
};

export async function GetAllWardFromDistrict(id_quan: number) {
  const result = await pg_client.select({ phuong: AdsSchema.Phuong, })
    .from(AdsSchema.Phuong).where( eq(AdsSchema.Phuong.id_quan, id_quan) );
  return result;
};
