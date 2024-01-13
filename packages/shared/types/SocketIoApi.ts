import z from "zod";
import { AdsProperty, ReportGeoJsonProperty } from "./AdsGeoJson.js";
import { Report } from "./ReportApi.js";
import { PlaceChangeRequestResponse } from "./PlaceChangeApi.js";
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const SocketNameSpace = ["report"] as const;
export const SocketEvents = [
  "Report:Update",
  "Report:Create",
  "AdReq:Update",
  "AdChange:Update",
  "PlaceChange:Update",
] as const;

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
  "AdsManager:UpdatePlaceChangeEvent": CustomEvent<
    PlaceChangeRequestResponse | undefined
  >;
  "AdsManager:UpdateAdReqEvent": CustomEvent<
    Omit<AdsProperty, "loai_vitri" | "hinh_thuc" | "bang_qc"> | undefined
  >;
}

export type SocketLevel = z.infer<typeof SocketLevelSchema>;
