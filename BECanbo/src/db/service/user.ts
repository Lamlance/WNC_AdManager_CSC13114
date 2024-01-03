import { pg_client } from "../db";
import { and, eq } from "drizzle-orm";
import {
  QuanLyPhuong,
  QuanLyQuan,
  TKNguoiDung,
} from "@admanager/backend/db/schema";
import { AuthApi } from "@admanager/shared";

type ReturnUser = {
  userId: string;
  username: string;
  name: string;
  accLevel: string;
  pwd: string;
  email: string;
  phone: string;
  managedDistricts: number[];
  managedWards: number[];
};

export const createAnUser = async (body: AuthApi.RegisterRequest) => {
  const data = await pg_client
    .insert(TKNguoiDung)
    .values({
      ten_tk: body.username,
      mat_khau: body.pwd,
      cap_tk: body.accLevel || "viewer",
      ten_ng_dung: body.name,
      sdt: body.phone,
      email: body.email,
    })
    .returning({
      userId: TKNguoiDung.id_tk,
      username: TKNguoiDung.ten_tk,
      name: TKNguoiDung.ten_ng_dung,
      accLevel: TKNguoiDung.cap_tk,
      pwd: TKNguoiDung.mat_khau,
      email: TKNguoiDung.email,
      phone: TKNguoiDung.sdt,
    });

  const insertedUser = data[0] as ReturnUser;

  if (body.managedDistricts.length > 0) {
    const res2 = await pg_client
      .insert(QuanLyQuan)
      .values(
        body.managedDistricts.map((districtId) => {
          return {
            id_tk: data[0].userId,
            id_quan: districtId,
          };
        })
      )
      .returning();

    insertedUser.managedDistricts = res2
      .map((managedDistrict) => managedDistrict.id_quan as number)
      .filter((id) => id !== null);
  }

  if (body.managedWards.length > 0) {
    const res3 = await pg_client
      .insert(QuanLyPhuong)
      .values(
        body.managedWards.map((wardId) => {
          return {
            id_tk: data[0].userId,
            id_phuong: wardId,
          };
        })
      )
      .returning();
    insertedUser.managedDistricts = res3
      .map((managedWard) => managedWard.id_phuong as number)
      .filter((id) => id !== null);
  }

  return insertedUser;
};

export const getUserById = async (id: string) => {
  const data = await pg_client.query.TKNguoiDung.findFirst({
    where: (TKNguoiDung, { eq }) => eq(TKNguoiDung.id_tk, id),
    with: {
      quan_quan_ly: true,
      phuong_quan_ly: true,
    },
  });

  if (data) {
    const returnUser: ReturnUser = {
      userId: data.id_tk,
      name: data.ten_ng_dung,
      username: data.ten_tk,
      pwd: data.mat_khau,
      accLevel: data.cap_tk,
      email: data.email,
      phone: data.sdt,
      managedDistricts: data.quan_quan_ly.map((e) => e.id_quan as number),
      managedWards: data.phuong_quan_ly.map((e) => e.id_phuong as number),
    };
    return returnUser;
  }
  return data;
};

export const getAnUserByUsername = async (username: string) => {
  const data = await pg_client.query.TKNguoiDung.findFirst({
    where: (TKNguoiDung, { eq }) => eq(TKNguoiDung.ten_tk, username),
    with: {
      quan_quan_ly: true,
      phuong_quan_ly: true,
    },
  });

  if (data) {
    const returnUser: ReturnUser = {
      userId: data.id_tk,
      name: data.ten_ng_dung,
      username: data.ten_tk,
      pwd: data.mat_khau,
      accLevel: data.cap_tk,
      email: data.email,
      phone: data.sdt,
      managedDistricts: data.quan_quan_ly.map((e) => e.id_quan as number),
      managedWards: data.phuong_quan_ly.map((e) => e.id_phuong as number),
    };
    return returnUser;
  }

  return data;
};

export const getAnUserByEmail = async (email: string) => {
  const data = await pg_client.query.TKNguoiDung.findFirst({
    where: (TKNguoiDung, { eq }) => eq(TKNguoiDung.ten_tk, email),
    with: {
      quan_quan_ly: true,
      phuong_quan_ly: true,
    },
  });

  if (data) {
    const returnUser: ReturnUser = {
      userId: data.id_tk,
      name: data.ten_ng_dung,
      username: data.ten_tk,
      pwd: data.mat_khau,
      accLevel: data.cap_tk,
      email: data.email,
      phone: data.sdt,
      managedDistricts: data.quan_quan_ly.map((e) => e.id_quan as number),
      managedWards: data.phuong_quan_ly.map((e) => e.id_phuong as number),
    };
    return returnUser;
  }
  return data;
};

type UpdateVerStatusUserParams = {
  username: string;
  verificationStatus: boolean;
};

export const updateVerificationStatusOfUser = async ({
  username,
  verificationStatus,
}: UpdateVerStatusUserParams) => {
  const [res] = await pg_client
    .update(TKNguoiDung)
    .set({ trang_thai_xac_thuc: verificationStatus })
    .where(eq(TKNguoiDung.ten_tk, username))
    .returning({
      userId: TKNguoiDung.id_tk,
      username: TKNguoiDung.ten_tk,
      name: TKNguoiDung.ten_ng_dung,
      accLevel: TKNguoiDung.cap_tk,
      pwd: TKNguoiDung.mat_khau,
      email: TKNguoiDung.email,
      phone: TKNguoiDung.sdt,
      isActivated: TKNguoiDung.trang_thai_xac_thuc,
    });
  return res;
};

type UpdatePasswordParams = {
  username: string;
  newPassword: string;
};

export const updatePasswordUser = async ({
  username,
  newPassword,
}: UpdatePasswordParams) => {
  const [res] = await pg_client
    .update(TKNguoiDung)
    .set({ mat_khau: newPassword })
    .where(eq(TKNguoiDung.ten_tk, username))
    .returning({
      userId: TKNguoiDung.id_tk,
      username: TKNguoiDung.ten_tk,
      name: TKNguoiDung.ten_ng_dung,
      accLevel: TKNguoiDung.cap_tk,
      pwd: TKNguoiDung.mat_khau,
      email: TKNguoiDung.email,
      phone: TKNguoiDung.sdt,
      isActivated: TKNguoiDung.trang_thai_xac_thuc,
    });
  return res;
};
