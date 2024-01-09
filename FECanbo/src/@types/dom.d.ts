import type { SocketIoApi } from "@admanager/shared";

interface CustomEventMap {
  "AdsManager:CreateReportEvent": CustomEvent<SocketIoApi.ReportCreateEvent>;
}

declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}
