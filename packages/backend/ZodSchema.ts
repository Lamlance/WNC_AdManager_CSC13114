import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as AdsSchema from "./db/schema.js";

const createBaoCaoSchema = createInsertSchema(AdsSchema.BaoCao);
export { createBaoCaoSchema };
