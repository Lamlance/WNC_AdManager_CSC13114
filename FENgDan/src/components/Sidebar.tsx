import { Drawer } from "antd";
import { useEffect, useState } from "react";
import Tab from "./Tabs";

function Sidebar({ openSidebar }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openSidebar) {
      setOpen(true);
    }
  }, [openSidebar]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
      >
        <Tab />
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0">
          {/* <AdsMap onAdMarkerClick={onAdMarkerClick} /> */}
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
