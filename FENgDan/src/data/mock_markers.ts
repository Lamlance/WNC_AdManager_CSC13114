import { CallAndCatch } from "@admanager/frontend";
import z from "zod";
const AdDataSchema = z.object({
  name: z.string(),
  address: z.string(),
  land_type: z.string(),
  ad_type: z.string(),
  legal: z.coerce.boolean(),
  panel_type: z.string(),
});
const AdsMarkerInfoSchema = z.object({
  ads: z.preprocess((val) => {
    if (Array.isArray(val)) return val;
    if (typeof val !== "string") return [];
    const data = CallAndCatch(({ d }: { d: string }) => JSON.parse(d), {
      d: val,
    });
    return data.success ? data.data : [];
  }, z.array(AdDataSchema).min(1)),
});

export { AdsMarkerInfoSchema };
