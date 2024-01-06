import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";
import { Quan } from "@admanager/backend/db/schema";

type GetAllDistrictArgs = {};

type GetDistrictByIdArgs = {
  id: string;
};

type CreateDistrictArgs = {
  ten_quan: string;
};

type DeleteDistrictByIdArgs = {
  id: number;
};

type UpdateDistrictArgs = {
  id: number;
  ten_quan: string;
};

export async function GetAllDistrict({}: GetAllDistrictArgs) {
  return await pg_client.select({ quan: Quan }).from(Quan);
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

export async function GetDistrictById({ id }: GetDistrictByIdArgs) {
  try {
    const numericId = parseInt(id, 10);

    const district = await pg_client
      .select({
        id_quan: Quan.id_quan,
        ten_quan: Quan.ten_quan,
      })
      .from(Quan)
      .where(eq(Quan.id_quan, numericId));

    if (district.length === 0) {
      return { success: false, error: "District not found." };
    }

    return { success: true, data: district[0] };
  } catch (error) {
    console.error("Error retrieving district:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function DeleteDistrictById({ id }: DeleteDistrictByIdArgs) {
  try {
    const res = await pg_client
      .delete(Quan)
      .where(eq(Quan.id_quan, id))
      .returning({ deletedId: Quan.id_quan });

    return res[0]?.deletedId;
  } catch (error) {
    console.error("Error deleting district:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function UpdateDistrict({ id, ten_quan }: UpdateDistrictArgs) {
  try {
    const existingDistrict = await pg_client
      .select({
        quan: Quan,
      })
      .from(Quan)
      .where(eq(Quan.id_quan, id));

    if (existingDistrict.length === 0) {
      return { success: false, error: "District not found." };
    }

    const updatedDistrict = await pg_client
      .update(Quan)
      .set({
        ten_quan,
      })
      .where(eq(Quan.id_quan, id));

    return { success: true, data: updatedDistrict };
  } catch (error) {
    console.error("Error updating district:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
