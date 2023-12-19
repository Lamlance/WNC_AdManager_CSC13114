import { AdsSchema } from "@admanager/backend"
import { pg_client } from "../db"
import { BaoCao, LoaiBaoCao } from "@admanager/backend/db/schema"
import { eq } from "drizzle-orm"

export const getALLReportInfo = async () => {
    const data = await pg_client.select({
        reporterName: BaoCao.ten_nguoi_gui,
        reporterEmail: BaoCao.email,
        reporterPhone: BaoCao.dien_thoai,
        reportContent: BaoCao.noi_dung,
        reportType: LoaiBaoCao.loai_bao_cao
        
    }).from(AdsSchema.BaoCao)
    .innerJoin(
        AdsSchema.LoaiBaoCao,
        eq(AdsSchema.BaoCao.id_loai_bc, AdsSchema.LoaiBaoCao.id_loai_bc)
    );

    return data;
}