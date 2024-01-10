import z from "zod";

// Ward Schema
const WardSchema = z.object({
  id_phuong: z.number(),
  ten_phuong: z.string(),
  id_quan: z.number(),
});

const CreateWardRequestSchema = z.object({
  ten_phuong: z.string(),
  id_quan: z.number(),
});

const CreateWardResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    id_quan: z.number(),
    ten_quan: z.string(),
    id_phuong: z.number(),
  }),
  error: z.string().nullable(),
});

const DeleteWardRequestSchema = z.object({
  id: z.number(),
});

const DeleteWardResponseSchema = z.object({
  success: z.boolean(),
  data: z.number().nullable(),
  error: z.string().nullable(),
});

type WardSchemaType = z.infer<typeof WardSchema>;
type CreateWardRequest = z.infer<typeof CreateWardRequestSchema>;
type CreateWardResponse = z.infer<typeof CreateWardResponseSchema>;
type DeleteWardRequest = z.infer<typeof DeleteWardRequestSchema>;
type DeleteWardResponse = z.infer<typeof DeleteWardResponseSchema>;

export { WardSchema, WardSchemaType };

export { CreateWardRequestSchema, CreateWardRequest };

export { CreateWardResponseSchema, CreateWardResponse };

export { DeleteWardRequestSchema, DeleteWardRequest };

export { DeleteWardResponseSchema, DeleteWardResponse };
