import { Drawer } from "antd";
import Tab from "./Tabs";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxStore";
import { setSelectedAdsLocation } from "../Redux/SelectedAdsSlice";

function Sidebar() {
  const selected = useAppSelector((state) => state.SelectedAds);
  const dispatch = useAppDispatch();

  function on_drawer_close() {
    dispatch(setSelectedAdsLocation(null));
  }

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={on_drawer_close}
        open={selected ? true : false}
        key="left"
        width="30%"
      >
        <Tab />

        {/* <div className="absolute bottom-0 left-0 right-0 top-0 z-10">
          <AdsMap onAdMarkerClick={onAdMarkerClick} />
        </div> */}
      </Drawer>
    </div>
  );
}

export default Sidebar;
