import z from "zod";
export const StatsResponseSchema = z.record(
  z.string(),
  z.object({
    chua_xu_ly: z.number(),
    dang_xu_ly: z.number(),
    da_xy_ly: z.number(),
    phuong: z.object({
      ten_phuong: z.string(),
      id_phuong: z.number(),
      id_quan: z.number(),
    }),
  })
);
export type StatsResponse = z.infer<typeof StatsResponseSchema>;
