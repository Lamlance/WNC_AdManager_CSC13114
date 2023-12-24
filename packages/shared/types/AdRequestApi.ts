import z from "zod";

const ManyAdsRequestResponseSchema = z.object({
  idYeucau: z.number(),
  adsContent: z.string(),
  companyEmail: z.string(),
  companyName: z.string(),
  companyPhone: z.string(),
  effDate: z.string(),
  expDate: z.string(),
});

type ManyAdsRequestResponse = z.infer<typeof ManyAdsRequestResponseSchema>;

export { ManyAdsRequestResponseSchema };
export type { ManyAdsRequestResponse };
