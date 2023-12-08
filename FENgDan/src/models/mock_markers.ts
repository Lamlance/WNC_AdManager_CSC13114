import { AdsGeoJson } from "@admanager/shared";
import { CallAndCatch } from "@admanager/frontend";
import z from "zod";

const AdsMarkerInfoSchema = z.object({
  ads: z.preprocess((val) => {
    if (Array.isArray(val)) return val;
    if (typeof val !== "string") return [];
    const data = CallAndCatch(({ d }: { d: string }) => JSON.parse(d), {
      d: val,
    });
    return data.success ? data.data : [];
  }, z.array(AdsGeoJson.AdsPropertySchema).min(1)),
});

export { AdsMarkerInfoSchema };
