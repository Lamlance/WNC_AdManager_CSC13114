import { Quan } from "@admanager/backend/db/schema.js";
import { pg_client } from "../db";


export async function GetAllDistrict() {
  return pg_client.select({ id: Quan.id_quan, ten_quan: Quan.ten_quan, }).from(Quan)
}
