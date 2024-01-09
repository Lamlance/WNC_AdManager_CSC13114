import { AdsGeoJson, SocketIoApi } from "@admanager/shared";
import { useEffect, useState } from "react";
import { Manager, Socket, io } from "socket.io-client";

function SocketIoPage() {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    if (socket) return;

    const manager = new Manager("http://localhost:4030", {
      path: "/io",
      query: { level: "wardDist" },
    });
    const ioSocket = manager.socket("/" + SocketIoApi.Namespaces.report);
    setSocket(ioSocket);
    ioSocket.on("connect", () => {
      setSocket(ioSocket);
      console.log("Connected");
    });

    ioSocket.on("create", (data: any) => {
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
  }, []);
  return <></>;
}
export default SocketIoPage;
