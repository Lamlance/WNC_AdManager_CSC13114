import { AdsSchema } from "@admanager/backend";
import { pg_client } from "../db";
import { eq } from "drizzle-orm";
import { TKNguoiDung } from "@admanager/backend/db/schema";
import { AuthApi } from "@admanager/shared";

export const createAnUser = async (body: AuthApi.RegisterRequest) => {
  const data = await pg_client
    .insert(AdsSchema.TKNguoiDung)
    .values({
      ten_tk: body.username,
      mat_khau: body.pwd,
      cap_tk: body.role || "viewer",
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
    .select({
      userId: TKNguoiDung.id_tk,
      username: TKNguoiDung.ten_tk,
      role: TKNguoiDung.cap_tk,
      pwd: TKNguoiDung.mat_khau
    })
    .from(AdsSchema.TKNguoiDung)
    .where(eq(AdsSchema.TKNguoiDung.ten_tk, username));

  return data;
};
