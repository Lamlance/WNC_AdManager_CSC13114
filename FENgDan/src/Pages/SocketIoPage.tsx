import { ReportApi, SocketIoApi } from "@admanager/shared";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager("http://localhost:4030", {
  path: "/io",
  query: { level: "client" },
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
  ioSocket.on(SocketIoApi.SocketEvents[0], (data: any) => {
    console.log(data);
    const report = ReportApi.ReportSchema.safeParse(data);
    if (report.success == false) return console.log(report.error);

    const event: SocketIoApi.CustomEventMap["AdsManager:UpdateReportEvent"] =
      new CustomEvent("AdsManager:UpdateReportEvent", {
        detail: report.data,
      });
    document.dispatchEvent(event);
  });
}

function ConnectSocketIo() {
  if (!ioSockets.reportSocket) ConnectReportSocket();
}

export { ConnectSocketIo };
