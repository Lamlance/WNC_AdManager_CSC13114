import z from "zod";

// District Schema
const DistrictSchema = z.object({
  id: z.number(),
  ten_quan: z.string(),
});

const CreateDistrictRequestSchema = z.object({
  ten_quan: z.string(),
});

const CreateDistrictResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id: z.number(),
    ten_quan: z.string(),
  }),
  error: z.string().nullable(),
});

const DeleteDistrictRequestSchema = z.object({
  id: z.number(),
});

const DeleteDistrictResponseSchema = z.object({
  success: z.boolean(),
  data: z.number().nullable(),
  error: z.string().nullable(),
});

type DistrictSchemaType = z.infer<typeof DistrictSchema>;
type CreateDistrictRequest = z.infer<typeof CreateDistrictRequestSchema>;
type CreateDistrictResponse = z.infer<typeof CreateDistrictResponseSchema>;
type DeleteDistrictRequest = z.infer<typeof DeleteDistrictRequestSchema>;
type DeleteDistrictResponse = z.infer<typeof DeleteDistrictResponseSchema>;

export { DistrictSchema, DistrictSchemaType };

export { CreateDistrictRequestSchema, CreateDistrictRequest };

export { CreateDistrictResponseSchema, CreateDistrictResponse };

export { DeleteDistrictRequestSchema, DeleteDistrictRequest };

export { DeleteDistrictResponseSchema, DeleteDistrictResponse };
