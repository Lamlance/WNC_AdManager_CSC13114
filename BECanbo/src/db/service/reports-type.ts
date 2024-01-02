import { LoaiBaoCao, BaoCao } from "@admanager/backend/db/schema";
import { pg_client } from "../db";
import { ReportApi } from "@admanager/shared";
import { eq } from "drizzle-orm";

export const getAllReportsType = async () => {
  const data = await pg_client
    .select({
      id_loai_bc: LoaiBaoCao.id_loai_bc,
      loai_bao_cao: LoaiBaoCao.loai_bao_cao,
    })
    .from(LoaiBaoCao)
  //   .innerJoin(BaoCao, eq(LoaiBaoCao.id_loai_bc, BaoCao.id_loai_bc));
  // console.log(data)
  return data;
};

export async function createReportType(data: ReportApi.ReportTypeProperty) {
  const { id_loai_bc, loai_bao_cao } = data;
  const res = await pg_client
    .insert(LoaiBaoCao)
    .values({ loai_bao_cao })
    .returning({ insertedId: LoaiBaoCao.id_loai_bc });

  return res[0].insertedId;
}

export async function updateReportType(data: ReportApi.ReportTypeProperty) {
  const { id_loai_bc, loai_bao_cao } = data;

  const res = await pg_client
    .update(LoaiBaoCao)
    .set({ loai_bao_cao: loai_bao_cao })
    .where(eq(LoaiBaoCao.id_loai_bc, id_loai_bc));

  return res;
}
export async function deleteReportType(data: ReportApi.ReportTypeProperty) {

  const res = await pg_client
    .delete(LoaiBaoCao)
    .where(eq(LoaiBaoCao.id_loai_bc, data.id_loai_bc));

  return res;
}
