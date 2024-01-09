import { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ReduxStore from "./Redux/ReduxStore";
import { Provider } from "react-redux";

import AdsMapPage from "./Pages/AdsMapPage";
import SocketIoPage from "./Pages/SocketIoPage";

function App() {
  return (
    <div className="h-screen w-screen">
      <AdsMapPage />
      {/* {sidebarVisible && <Sidebar openSidebar={closeSidebar} />} */}
      <Sidebar />
    </div>
  );
}

export default function () {
  useEffect(() => {
    const head = document.querySelector("head");
    if (!head) {
      return;
    }
    const tailWindStyleTag = [...head.querySelectorAll("style")].find((style) =>
      style.innerHTML.includes("tailwind"),
    );
    if (tailWindStyleTag) {
      head.insertAdjacentElement("afterbegin", tailWindStyleTag);
    }
  }, []);
  return (
    <Provider store={ReduxStore}>
      <>
        <SocketIoPage />
        <App />
      </>
    </Provider>
  );
}
