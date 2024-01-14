import z from "zod";

const UserDataSchema = z.object({
  id_tk: z.string(),
  ten_tk: z.string(),
  mat_khau: z.string(),
  cap_tk: z.string(),
  ten_ng_dung: z.string(),
  email: z.string(),
  sdt: z.string(),
});

const RegisterRequestSchema = z.object({
  username: z.string(),
  pwd: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  accLevel: z
    .union([z.literal("ward"), z.literal("district"), z.literal("department")])
    .optional(),
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

const LoginResponseSchema = z.object({
  user: z.object({
    userId: z.string(),
    name: z.string(),
    username: z.string(),
    pwd: z.string(),
    accLevel: z.string(),
    email: z.string(),
    phone: z.string(),
    managedDistricts: z.number().array(),
    managedWards: z.number().array(),
  }),
  authToken: z.string(),
});

const FullUserDataSchema = z.object({
  user: UserDataSchema,
  ward: z.object({ id_phuong: z.number(), ten_phuong: z.string() }).array(),
  district: z.object({ id_quan: z.number(), ten_quan: z.string() }).array(),
});

const UserUpdateRequestSchema = UserDataSchema.omit({
  id_tk: true,
  mat_khau: true,
}).merge(z.object({ ward_list: z.number().array().nullish() }));

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

type LoginResponse = z.infer<typeof LoginResponseSchema>;

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

type FullUserData = z.infer<typeof FullUserDataSchema>;
type UserData = z.infer<typeof UserDataSchema>;
type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>;

export {
  RegisterRequestSchema,
  LoginRequestSchema,
  SendVerificationCodeToEmailRequestSchema,
  VerifyEmailRequestSchema,
  ChangePasswordRequestSchema,
  ChangePasswordTokenRequestSchema,
  FullUserDataSchema,
  UserDataSchema,
  UserUpdateRequestSchema,
  LoginResponseSchema,
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
  FullUserData,
  UserData,
  UserUpdateRequest,
};
