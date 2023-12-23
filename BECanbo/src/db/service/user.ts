import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { and, eq } from "drizzle-orm";
import { UserDto } from "../../types/dto/user";
import { TKNguoiDung } from "@admanager/backend/db/schema";

export const createAnUser = async (body: UserDto) => {
  const data = await pg_client
    .insert(AdsSchema.TKNguoiDung)
    .values({
      ten_tk: body.username,
      mat_khau: body.password,
      cap_tk: body.role,
    })
    .returning({
      id: TKNguoiDung.id_tk,
      username: TKNguoiDung.ten_tk,
      password: TKNguoiDung.mat_khau,
      role: TKNguoiDung.cap_tk,
    });

  return data;
};

export const getUserById = async (id: string) => {
  const data = await pg_client
    .select()
    .from(AdsSchema.TKNguoiDung)
    .where(eq(AdsSchema.TKNguoiDung.id_tk, id));

  return data;
};

export const getAnUserByUsername = async (username: string) => {
  const data = await pg_client
    .select()
    .from(AdsSchema.TKNguoiDung)
    .where(eq(AdsSchema.TKNguoiDung.ten_tk, username));

  return data;
};
