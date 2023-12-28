import z from "zod";

const RegisterRequestSchema = z.object({
    username: z.string(),
    pwd: z.string(),
    role: z.string().optional()
});

const LoginRequestSchema = z.object({
    username: z.string(),
    pwd: z.string()
});

type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
type LoginRequest = z.infer<typeof LoginRequestSchema>;

export {
    RegisterRequestSchema,
    LoginRequestSchema
}

export type {
    RegisterRequest,
    LoginRequest
}