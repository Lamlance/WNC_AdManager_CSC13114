import { AdsSchema } from "../..";
import { pg_client } from "../db.js";

type GetManyDiaDiem_P =
  | { type: "phuong"; phuong: number }
  | { type: "quan"; quan: number }
  | { type: "none" };
async function GetManyDiaDiem(param: GetManyDiaDiem_P = { type: "none" }) {
  const data = await pg_client.query.DiaDiem.findMany({
    limit: 100,
    ...(param.type === "phuong"
      ? { where: (f, o) => o.eq(f.id_phuong, param.phuong) }
      : {}),

    ...(param.type === "quan"
      ? { where: (f, o) => o.eq(f.id_quan, param.quan) }
      : {}),
  });

  return data;
}

type CreateDiaDiem_P = Omit<
  typeof AdsSchema.DiaDiem.$inferInsert,
  "id_dia_diem"
>;
async function CreateDiaDiem(insertData: CreateDiaDiem_P) {
  await pg_client.insert(AdsSchema.DiaDiem).values(insertData);
  return true;
}

export { GetManyDiaDiem, CreateDiaDiem };
