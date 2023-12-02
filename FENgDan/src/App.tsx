import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import AdsMap from "./components/AdsMap";
function App() {
  return (
    <div>
      {/* <div className="flex place-items-center bg-blue-500">HelloNgDan</div>
      <Button type="primary">Button</Button>
      <DemoComponent /> */}
      <Sidebar />
    </div>
  );
}

export default App;

// export default function () {
//   useEffect(() => {
//     const head = document.querySelector("head");
//     if (!head) {
//       return;
//     }
//     const tailWindStyleTag = [...head.querySelectorAll("style")].find((style) =>
//       style.innerHTML.includes("tailwind"),
//     );
//     if (tailWindStyleTag) {
//       head.insertAdjacentElement("afterbegin", tailWindStyleTag);
//     }
//   }, []);
//   return <App />;
// }
