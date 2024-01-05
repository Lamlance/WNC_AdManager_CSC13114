import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";
import { Quan } from "@admanager/backend/db/schema";

type GetAllDistrictArgs = {};

type CreateDistrictArgs = {
  ten_quan: string;
};

export async function GetAllDistrict({}: GetAllDistrictArgs) {
  return await pg_client.select({ quan: AdsSchema.Quan }).from(AdsSchema.Quan);
}

export async function CreateDistrict({ ten_quan }: CreateDistrictArgs) {
  try {
    const existingDistrict = await pg_client
      .select({
        quan: Quan,
      })
      .from(Quan)
      .where(eq(Quan.ten_quan, ten_quan));

    if (existingDistrict.length > 0) {
      return { success: false, error: "District is already existed." };
    }

    const newDistrict = await pg_client.insert(Quan).values({ ten_quan });

    return { success: true, data: newDistrict };
  } catch (error) {
    console.error("Error creating ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
