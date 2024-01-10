import type { SocketIoApi } from "@admanager/shared";

declare global {
  interface Document {
    addEventListener<K extends keyof SocketIoApi.CustomEventMap>(
      type: K,
      listener: (this: Document, ev: SocketIoApi.CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof SocketIoApi.CustomEventMap>(
      ev: SocketIoApi.CustomEventMap[K],
    ): void;
    removeEventListener<K extends keyof SocketIoApi.CustomEventMap>(
      type: K,
      listener: (this: Document, ev: SocketIoApi.CustomEventMap[K]) => void,
      useCapture?: boolean,
    ): void;
  }
}
