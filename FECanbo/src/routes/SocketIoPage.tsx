import { AdsGeoJson, PlaceChangeApi, SocketIoApi } from "@admanager/shared";
import { Manager, Socket } from "socket.io-client";

class SocketIo {
  public static manager = new Manager("http://localhost:4030", {
    path: "/io",
    query: { level: "wardDist" },
  });

  public static _socket: Socket | null = null;
  public static ConnectReportSocket() {
    SocketIo._socket = SocketIo.manager.socket(
      "/" + SocketIoApi.SocketNameSpace[0],
    );

    SocketIo._socket.on("connect", () => {
      console.log("Connected");
    });

    SocketIo._socket.on(SocketIoApi.SocketEvents[1], (data: any) => {
      console.log("Create event", data);

      const report = AdsGeoJson.ReportGeoJsonPropertySchema.safeParse(data);
      if (report.success == false) return console.log(report.error);
      document.dispatchEvent(
        new CustomEvent<SocketIoApi.ReportCreateEvent>(
          "AdsManager:CreateReportEvent",
          {
            detail: { report: report.data },
          },
        ),
      );
    });

    SocketIo._socket.on(SocketIoApi.SocketEvents[0], () => {
      const event: SocketIoApi.CustomEventMap["AdsManager:UpdateReportEvent"] =
        new CustomEvent("AdsManager:UpdateReportEvent");
      document.dispatchEvent(event);
    });

    SocketIo._socket.on(SocketIoApi.SocketEvents[3], (data) => {
      const req =
        PlaceChangeApi.PlaceChangeRequestResponseSchema.safeParse(data);
      if (req.success == false) return console.warn(req.error);

      const event: SocketIoApi.CustomEventMap["AdsManager:UpdatePlaceChangeEvent"] =
        new CustomEvent("AdsManager:UpdatePlaceChangeEvent", {
          detail: req.data,
        });
      document.dispatchEvent(event);
    });
    return SocketIo._socket;
  }

  public static DisconnectReportSocket() {
    SocketIo._socket?.disconnect();
    SocketIo._socket = null;
  }
}

export { SocketIo };
