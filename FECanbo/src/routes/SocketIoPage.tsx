import { AdsGeoJson, SocketIoApi } from "@admanager/shared";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager("http://localhost:4030", {
  path: "/io",
  query: { level: "wardDist" },
});

const ioSockets: {
  reportSocket?: Socket;
} = {};

function ConnectReportSocket() {
  const ioSocket = manager.socket("/" + SocketIoApi.SocketNameSpace[0]);

  ioSocket.on("connect", () => {
    console.log("Connected");
    ioSockets.reportSocket = ioSocket;
  });

  ioSocket.on(SocketIoApi.SocketEvents.report[1], (data: any) => {
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
}

function ConnectSocketIo() {
  console.log("Socket", ioSockets.reportSocket);
  if (!ioSockets.reportSocket) ConnectReportSocket();
}

export { ConnectSocketIo };
