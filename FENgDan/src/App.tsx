import { useEffect } from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import AdsMap from "./components/AdsMap";

function App() {
  return (
    <div className=" relative">
      <div className=" h-screen w-screen">
        <AdsMap />
      </div>
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
