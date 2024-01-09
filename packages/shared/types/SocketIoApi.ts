import z from "zod";
import { ReportGeoJsonProperty } from "./AdsGeoJson.js";

export type SocketIoNamespace = "report";
export const Namespaces: {
  report: SocketIoNamespace;
} = { report: "report" } as const;

export const SocketLevelSchema = z.union([
  z.literal("client"),
  z.literal("wardDist"),
  z.literal("department"),
]);

export type ReportCreateEvent = {
  report?: ReportGeoJsonProperty;
};

export type SocketLevel = z.infer<typeof SocketLevelSchema>;
