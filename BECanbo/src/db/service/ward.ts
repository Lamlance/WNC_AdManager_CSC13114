import { pg_client } from "../db";
import { eq, inArray } from "drizzle-orm";
import { Quan, Phuong } from "@admanager/backend/db/schema";

type GetAllWardArgs = {
  id_quan?: number[];
};

type CreateWardArgs = {
  ten_phuong: string;
  id_quan: number;
};

type DeleteWardArgs = {
  id: number;
};

type GetWardArgs = {
  id: string;
};

type UpdateWardArgs = {
  id: number;
  ten_phuong?: string | null;
  id_quan?: number | null;
};

export async function GetAllWard({ id_quan }: GetAllWardArgs) {
  const getPhuong = pg_client
    .select({
      phuong: Phuong,
      quan: Quan,
    })
    .from(Phuong)
    .innerJoin(Quan, eq(Phuong.id_quan, Quan.id_quan));
  if (id_quan) {
    return await getPhuong.where(inArray(Phuong.id_quan, id_quan));
  }
  return await getPhuong;
}

export async function CreateWard({ ten_phuong, id_quan }: CreateWardArgs) {
  try {
    const existingDistrict = await pg_client
      .select({
        quan: Quan,
      })
      .from(Quan)
      .where(eq(Quan.id_quan, id_quan));

    if (!existingDistrict || existingDistrict.length === 0) {
      return { success: false, error: "District not found." };
    }

    const newWard = await pg_client
      .insert(Phuong)
      .values({ ten_phuong, id_quan });

    return { success: true, data: newWard };
  } catch (error) {
    console.error("Error creating ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function DeleteWard({ id }: DeleteWardArgs) {
  try {
    const deletedWard = await pg_client
      .delete(Phuong)
      .where(eq(Phuong.id_phuong, id))
      .returning({ deletedId: Phuong.id_phuong });

    return { success: true, data: deletedWard[0]?.deletedId };
  } catch (error) {
    console.error("Error deleting ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function GetWard({ id }: GetWardArgs) {
  try {
    const numericId = parseInt(id, 10);

    const ward = await pg_client
      .select({
        id_phuong: Phuong.id_phuong,
        ten_phuong: Phuong.ten_phuong,
        id_quan: Phuong.id_quan,
        ten_quan: Quan.ten_quan,
      })
      .from(Phuong)
      .innerJoin(Quan, eq(Phuong.id_quan, Quan.id_quan))
      .where(eq(Phuong.id_phuong, numericId));

    if (ward.length === 0) {
      return { success: false, error: "Ward not found." };
    }

    return { success: true, data: ward };
  } catch (error) {
    console.error("Error retrieving ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function UpdateWard({ id, ten_phuong, id_quan }: UpdateWardArgs) {
  try {
    const existingWard = await pg_client
      .select({
        phuong: Phuong,
      })
      .from(Phuong)
      .where(eq(Phuong.id_phuong, id));

    if (!existingWard) {
      return { success: false, error: "Ward not found." };
    }

    const updateData: Record<string, any> = {};

    if (ten_phuong !== undefined) {
      updateData.ten_phuong = ten_phuong;
    }

    if (id_quan !== undefined) {
      updateData.id_quan = id_quan;
    }

    const updatedWard = await pg_client
      .update(Phuong)
      .set(updateData)
      .where(eq(Phuong.id_phuong, id));

    return { success: true, data: updatedWard };
  } catch (error) {
    console.error("Error updating ward:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
