import * as AdsSchema from "./schema";

export namespace AdsSchemaType {
  export type LoaiViTri = typeof AdsSchema.LoaiViTri.$inferSelect;
  export type HinhThucQC = typeof AdsSchema.HinhThucQC.$inferSelect;
  export type LoaiBangQC = typeof AdsSchema.LoaiBangQC.$inferSelect;
  export type Quan = typeof AdsSchema.Quan.$inferSelect;
  export type Phuong = typeof AdsSchema.Phuong.$inferSelect;
  export type DiaDiem = typeof AdsSchema.DiaDiem.$inferSelect;
  export type QuangCao = typeof AdsSchema.QuangCao.$inferSelect;
  export type LoaiBaoCao = typeof AdsSchema.LoaiBaoCao.$inferSelect;
  export type BaoCao = typeof AdsSchema.BaoCao.$inferSelect;
  export type YeuCauCapPhep = typeof AdsSchema.YeuCauCapPhep.$inferSelect;
}
