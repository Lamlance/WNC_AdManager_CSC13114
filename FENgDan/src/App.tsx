/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import "./App.css";
import AdsMap from "./components/AdsMap";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="h-screen w-screen">
      <AdsMap onAdMarkerClick={openSidebar} />
      {sidebarVisible && <Sidebar openSidebar={closeSidebar} />}
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
  return <App />;
}
