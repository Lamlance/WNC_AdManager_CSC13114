import z from "zod";
import { ReportGeoJsonProperty } from "./AdsGeoJson.js";
import { Report } from "./ReportApi.js";
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const SocketNameSpace = ["report"] as const;
export const SocketEvents: {
  [key in ArrayElement<typeof SocketNameSpace>]: ["update", "create"];
} = {
  report: ["update", "create"],
};

export const SocketLevelSchema = z.union([
  z.literal("client"),
  z.literal("wardDist"),
  z.literal("department"),
]);

export type ReportCreateEvent = {
  report?: ReportGeoJsonProperty;
};

export interface CustomEventMap {
  "AdsManager:CreateReportEvent": CustomEvent<ReportCreateEvent>;
  "AdsManager:UpdateReportEvent": CustomEvent<Report | undefined>;
}

export type SocketLevel = z.infer<typeof SocketLevelSchema>;
