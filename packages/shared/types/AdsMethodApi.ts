import z from "zod";

const AdsMethodSchema = z.object({
  id_htqc: z.number(),
  hinh_thuc_qc: z.string()
});

const CreateAdsMethodRequestSchema = z.object({
   hinh_thuc_qc: z.string()
});

const CreateAdsMethodResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id_htqc: z.number(),
    hinh_thuc_qc: z.string()
  }),
  error: z.string().nullable(),
});

const DeleteAdsMethodRequestSchema = z.object({
  id_htqc: z.number(),
});

const DeleteAdsMethodResponseSchema = z.object({
  success: z.boolean(),
  data: z.number().nullable(),
  error: z.string().nullable(),
});

type AdsMethodSchemaType = z.infer<typeof AdsMethodSchema>;
type CreatedsMethodRequest = z.infer<typeof CreateAdsMethodRequestSchema>;
type CreatedsMethodResponse = z.infer<typeof CreateAdsMethodResponseSchema>;
type DeletedsMethodRequest = z.infer<typeof DeleteAdsMethodRequestSchema>;
type DeletedsMethodResponse = z.infer<typeof DeleteAdsMethodResponseSchema>;


export { AdsMethodSchema, AdsMethodSchemaType };

export { CreateAdsMethodRequestSchema, CreatedsMethodRequest };

export { CreateAdsMethodResponseSchema, CreatedsMethodResponse };

export { DeleteAdsMethodRequestSchema, DeletedsMethodRequest };

export { DeleteAdsMethodResponseSchema, DeletedsMethodResponse };

