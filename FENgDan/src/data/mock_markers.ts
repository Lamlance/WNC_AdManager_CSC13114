import z from "zod";

const AdsMarkerInfoSchema = z.object({
  name: z.string(),
  address: z.string(),
  land_type: z.string(),
  ad_type: z.string(),
  legal: z.coerce.boolean(),
});

export { AdsMarkerInfoSchema };
