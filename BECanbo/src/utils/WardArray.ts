import z from "zod";

const WardArraySchema = z.preprocess(
  (v) => (typeof v === "string" ? v.split(",") : v),
  z.array(z.coerce.number()).min(1)
);

export { WardArraySchema };
