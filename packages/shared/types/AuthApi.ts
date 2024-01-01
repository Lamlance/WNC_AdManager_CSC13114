import z from "zod";

const RegisterRequestSchema = z.object({
  username: z.string(),
  pwd: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  accLevel: z.string().optional(),
  managedWards: z.number().array(),
  managedDistricts: z.number().array(),
});

const LoginRequestSchema = z.object({
  username: z.string(),
  pwd: z.string(),
});

const SendVerificationCodeToEmailSchema = z.object({
  email: z.string().email().min(3),
});

const VerifyEmailSchema = z.object({
  confirmToken: z.string().min(10),
  code: z.string().length(6),
});

const ChangePasswordTokenSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmToken: z.string(),
  code: z.string().length(6),
});

const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
type LoginRequest = z.infer<typeof LoginRequestSchema>;
type SendVerificationCodeToEmailRequest = z.infer<
  typeof SendVerificationCodeToEmailSchema
>;
type VerifyEmailRequest = z.infer<typeof VerifyEmailSchema>;
type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
type ChangePasswordTokenRequest = z.infer<typeof ChangePasswordTokenSchema>;

export {
  RegisterRequestSchema,
  LoginRequestSchema,
  SendVerificationCodeToEmailSchema,
  VerifyEmailSchema,
  ChangePasswordSchema,
  ChangePasswordTokenSchema,
};

export type {
  RegisterRequest,
  LoginRequest,
  SendVerificationCodeToEmailRequest,
  VerifyEmailRequest,
  ChangePasswordRequest,
  ChangePasswordTokenRequest,
};
