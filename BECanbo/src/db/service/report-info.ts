import { AdsSchema } from "@admanager/backend"
import { pg_client } from "../db"
import { BaoCao, DiaDiem, LoaiBaoCao, QuangCao } from "@admanager/backend/db/schema"
import { eq } from "drizzle-orm"

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
    );

    return data;
}