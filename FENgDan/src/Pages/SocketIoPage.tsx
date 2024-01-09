import { SocketIoApi } from "@admanager/shared";
import { useEffect, useState } from "react";
import { Manager, Socket, io } from "socket.io-client";

function SocketIoPage() {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    if (socket) return;
    const manager = new Manager("http://localhost:4030", {
      path: "/io",
      query: { level: "client" },
    });
    const ioSocket = manager.socket("/" + SocketIoApi.Namespaces.report);
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
      console.log("Connected");
    });
    ioSocket.on("update", (data: any) => {
      console.log("Upadate event", data);
    });
  }, []);
  return <></>;
}
export default SocketIoPage;
