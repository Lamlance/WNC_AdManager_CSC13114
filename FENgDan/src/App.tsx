/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import "./App.css";
import AdsMap from "./components/AdsMap";
import Sidebar from "./components/Sidebar";
import ReduxStore from "./Redux/ReduxStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="h-screen w-screen">
      <AdsMap />
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
      <App />
    </Provider>
  );
}
