import { AdsSchema, AdsZodSchema } from "@admanager/backend";
import { pg_client } from "../db.js";
import {
  BaoCao,
  DiaDiem,
  LoaiBaoCao,
  QuangCao,
} from "@admanager/backend/db/schema";
import { SQL, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { VNCharToEN } from "../../utils/VNCharToEN.js";

type GetALLReportInfoArgs = {
  phuong_id?: number[];
};

export const getALLReportInfo = async function (
  args: GetALLReportInfoArgs
): Promise<ReportApi.ReportResponse[]> {
  const ward_list =
    args.phuong_id &&
    (await pg_client
      .select()
      .from(AdsSchema.Phuong)
      .where(inArray(AdsSchema.Phuong.id_phuong, args.phuong_id)));
  const query = pg_client
    .select({
      bao_cao: AdsSchema.BaoCao,
      loai_bc: AdsSchema.LoaiBaoCao.loai_bao_cao,
    })
    .from(AdsSchema.BaoCao)
    .innerJoin(
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
    )
    .orderBy(desc(AdsSchema.BaoCao.thoi_diem_bc));

  if (ward_list) {
    const q = ward_list.reduce((acum, curr) => {
      acum.push(ilike(AdsSchema.BaoCao.dia_chi, `%${curr.ten_phuong}%`));
      acum.push(
        ilike(AdsSchema.BaoCao.dia_chi, `%${VNCharToEN(curr.ten_phuong)}%`)
      );
      return acum;
    }, [] as SQL[]);

    query.where(or(...q));
  }

  return await query;
};

export async function createReportInfo(
  data: Zod.infer<typeof AdsZodSchema.createBaoCaoSchema>
) {
  const res = await pg_client
    .insert(AdsSchema.BaoCao)
    .values({
      ...data,
      trang_thai: data.trang_thai || undefined,
      thoi_diem_bc: data.thoi_diem_bc || undefined,
    })
    .returning({
      insertId: AdsSchema.BaoCao.id_bao_cao,
    });

  if (typeof res[0]?.insertId !== "number") return null;
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
      eq(AdsSchema.BaoCao.id_loai_bc, AdsSchema.LoaiBaoCao.id_loai_bc)
    )
    .leftJoin(
      AdsSchema.QuangCao,
      eq(AdsSchema.BaoCao.id_quang_cao, AdsSchema.QuangCao.id_quang_cao)
    )
    .leftJoin(
      AdsSchema.DiaDiem,
      eq(AdsSchema.BaoCao.id_dia_diem, AdsSchema.DiaDiem.id_dia_diem)
    );
  return rpGeo[0] || null;
}

export async function getReportById(id: number) {
  const query = pg_client
    .select({
      bao_cao: AdsSchema.BaoCao,
      loai_bc: AdsSchema.LoaiBaoCao.loai_bao_cao,
    })
    .from(AdsSchema.BaoCao)
    .where(eq(AdsSchema.BaoCao.id_bao_cao, id))
    .innerJoin(
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
  return await query;
}

export async function updateStatusReport(params: ReportApi.ReportUpdate) {
  const data = await pg_client
    .update(AdsSchema.BaoCao)
    .set({
      trang_thai: params.trang_thai,
      phan_hoi: params.phan_hoi,
    })
    .where(eq(AdsSchema.BaoCao.id_bao_cao, params.id_bao_cao))
    .returning({ updated: AdsSchema.BaoCao });
  return data[0] ? data[0].updated : null;
}
