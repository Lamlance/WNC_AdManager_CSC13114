import { AdsSchema, AdsZodSchema } from "@admanager/backend";
import { pg_client } from "../db.js";
import {
  BaoCao,
  DiaDiem,
  LoaiBaoCao,
  QuangCao,
} from "@admanager/backend/db/schema";
import { eq } from "drizzle-orm";
import { AdsGeoJson, ReportApi } from "@admanager/shared";

export const getALLReportInfo = async () => {
    const data = await pg_client.select({
        id: BaoCao.id_bao_cao,
        reporterName: BaoCao.ten_nguoi_gui,
        reporterEmail: BaoCao.email,
        reporterPhone: BaoCao.dien_thoai,
        reportContent: BaoCao.noi_dung,
        reportType: LoaiBaoCao.loai_bao_cao,
        reportTime: BaoCao.thoi_diem_bc,
        status: BaoCao.trang_thai,
        adsId: QuangCao.id_quang_cao,
        adsAddress: DiaDiem.ten_dia_diem,
    }).from(AdsSchema.BaoCao)
export const getALLReportInfo = async function (): Promise<
  ReportApi.ReportResponse[]
> {
  const data = await pg_client
    .select({
      bao_cao: AdsSchema.BaoCao,
      loai_bc: AdsSchema.LoaiBaoCao.loai_bao_cao,
    })
    .from(AdsSchema.BaoCao)
    .innerJoin(
        AdsSchema.LoaiBaoCao,
        eq(AdsSchema.BaoCao.id_loai_bc, AdsSchema.LoaiBaoCao.id_loai_bc)
    )
    .innerJoin(
        AdsSchema.QuangCao,
        eq(AdsSchema.BaoCao.id_quang_cao, AdsSchema.QuangCao.id_quang_cao)
    )
    .innerJoin(
        AdsSchema.DiaDiem,
        eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.QuangCao.id_quang_cao)
      AdsSchema.LoaiBaoCao,
      eq(AdsSchema.BaoCao.id_loai_bc, AdsSchema.LoaiBaoCao.id_loai_bc)
    )
    .leftJoin(
      AdsSchema.QuangCao,
      eq(AdsSchema.BaoCao.id_quang_cao, AdsSchema.QuangCao.id_quang_cao)
    )
    .leftJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.QuangCao.id_dia_diem)
    );

  return data;
};

export async function createReportInfo(
  data: typeof AdsSchema.BaoCao.$inferInsert
) {
  const res = await pg_client.insert(AdsSchema.BaoCao).values(data).returning({
    insertId: AdsSchema.BaoCao.id_bao_cao,
  });
  if (res.length <= 0) return null;
  const rpGeo: AdsGeoJson.ReportGeoJsonProperty[] = await pg_client
    .select({
      bao_cao: AdsSchema.BaoCao,
      loai_bao_cao: AdsSchema.LoaiBaoCao.loai_bao_cao,
      dia_diem: AdsSchema.DiaDiem,
      quang_cao: AdsSchema.QuangCao,
    })
    .from(AdsSchema.BaoCao)
    .where(eq(AdsSchema.BaoCao.id_bao_cao, res[0].insertId))
    .innerJoin(
      AdsSchema.LoaiBaoCao,
      eq(AdsSchema.BaoCao.id_bao_cao, AdsSchema.LoaiBaoCao.id_loai_bc)
    )
    .leftJoin(
      AdsSchema.QuangCao,
      eq(AdsSchema.BaoCao.id_quang_cao, AdsSchema.QuangCao.id_quang_cao)
    )
    .leftJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.DiaDiem.id_dia_diem, AdsSchema.QuangCao.id_dia_diem)
    );
  return rpGeo.length > 0 ? rpGeo[0] : null;
}
