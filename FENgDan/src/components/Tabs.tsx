import { Tabs } from "antd";
import AdsInfor from "./AdsInfor";

function Tab() {
  const tabItems = [
    {
      label: "Dữ liệu quảng cáo",
      key: "1",
      children: <AdsInfor />,
    },
    {
      label: "Dữ liệu báo cáo",
      key: "2",
      children: "Content for the second tab",
    },
  ];

  return (
    <div className="flex h-full flex-col items-center">
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        className="mx-auto w-full max-w-md"
      />
    </div>
  );
}

export default Tab;
