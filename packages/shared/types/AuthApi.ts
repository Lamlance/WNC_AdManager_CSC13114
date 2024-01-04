import z from "zod";

const RegisterRequestSchema = z.object({
  username: z.string(),
  pwd: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  accLevel: z.string().optional(),
  managedWards: z.number().array().default([]),
  managedDistricts: z.number().array().default([]),
});

const LoginRequestSchema = z.object({
  username: z.string(),
  pwd: z.string(),
});

const SendVerificationCodeToEmailRequestSchema = z.object({
  email: z.string().email().min(3),
});

const VerifyEmailRequestSchema = z.object({
  confirmToken: z.string().min(10),
  code: z.string().length(6),
});

const ChangePasswordTokenRequestSchema = z.object({
  newPassword: z.string().min(6),
  confirmToken: z.string(),
  code: z.string().length(6),
});

const ChangePasswordRequestSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
type LoginRequest = z.infer<typeof LoginRequestSchema>;
type SendVerificationCodeToEmailRequest = z.infer<
  typeof SendVerificationCodeToEmailRequestSchema
>;
type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;
type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
type ChangePasswordTokenRequest = z.infer<
  typeof ChangePasswordTokenRequestSchema
>;

type LoginResponse = {
  authToken: string;
  user: any;
};

type RegisterResponse = {
  confirmToken: string;
};

type SendVerificationCodeToEmailResponse = {
  confirmToken: string;
};

type VerifyEmailResponse = {
  msg: string;
};

type ChangePasswordRespone = {
  authToken: string;
};

type ChangePasswordTokenResponse = {
  authToken: string;
};

export {
  RegisterRequestSchema,
  LoginRequestSchema,
  SendVerificationCodeToEmailRequestSchema,
  VerifyEmailRequestSchema,
  ChangePasswordRequestSchema,
  ChangePasswordTokenRequestSchema,
};

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationCodeToEmailRequest,
  SendVerificationCodeToEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ChangePasswordRequest,
  ChangePasswordRespone,
  ChangePasswordTokenResponse,
  ChangePasswordTokenRequest,
};
