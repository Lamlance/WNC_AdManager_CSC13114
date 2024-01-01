import z from "zod";

export const PhuongIdArrayScheama = z.preprocess(
  (v) => (typeof v === "string" ? v.split(",") : v),
  z.array(z.coerce.number())
);
