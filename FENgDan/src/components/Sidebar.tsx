import { Button, Drawer, Space } from "antd";
import { useState } from "react";
import Tab from "./Tabs";

// import { theme } from "antd";
// import AdsDetail from "./AdsDetail";
// import AdsInfor from "./AdsInfor";
// import AdsMap from "./AdsMap";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
      >
        <Tab />
        <div className=" absolute bottom-0 left-0 right-0 top-0 z-0">
          {/* <AdsMap onAdMarkerClick={onAdMarkerClick} /> */}
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
