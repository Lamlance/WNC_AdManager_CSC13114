import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq, inArray } from "drizzle-orm";
import { Quan } from "@admanager/backend/db/schema";

type GetAllWardArgs = {
  id_quan?: number[];
};

type CreateWardArgs = {
  ten_phuong: string;
  id_quan: number;
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
}

export async function CreateWard({ ten_phuong, id_quan }: CreateWardArgs) {
  try {
    const existingDistrict = await pg_client
      .select({
        quan: AdsSchema.Quan,
      })
      .from(Quan)
      .where(eq(AdsSchema.Quan.id_quan, id_quan));

    if (!existingDistrict || existingDistrict.length === 0) {
      return { success: false, error: "District not found." };
    }

    console.log(existingDistrict);
    const newWard = await pg_client
      .insert(AdsSchema.Phuong)
      .values({ ten_phuong, id_quan });

    return { success: true, data: newWard };
  } catch (error) {
    console.error("Error creating ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
