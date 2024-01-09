import { SocketIoApi } from "@admanager/shared";
import { Manager, Socket } from "socket.io-client";

const manager = new Manager("http://localhost:4030", {
  path: "/io",
  query: { level: "client" },
});

const ioSockets: {
  reportSocket?: Socket;
} = {};

function ConnectReportSocket() {
  const ioSocket = manager.socket("/" + SocketIoApi.Namespaces.report);
  ioSocket.on("connect", () => {
    console.log("Connected");
    ioSockets.reportSocket = ioSocket;
  });
  ioSocket.on("update", (data: any) => {
    console.log("Upadate event", data);
  });
}

function ConnectSocketIo() {
  if (!ioSockets.reportSocket) ConnectReportSocket();
}

export { ConnectSocketIo };
